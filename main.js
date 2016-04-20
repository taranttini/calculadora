import React from 'react';
import ReactDOM from 'react-dom';


class MyButton extends React.Component {

    constructor(props) {

        super(props);
        this.displayName = 'MyButton';
    }

    onClick(e, operator) {

        e.preventDefault();

        let { data } = this.props;
        data = data ? data.operator : '';
        this.props.onClick(e.target.value, data);
    }

    render() {

        let {children, data} = this.props;

        if (data) {
            children = parseInt(data.text) > 0 ? String.fromCharCode(data.text) : data.text;
        }

        return (
            <div>
                <input type='button' onClick={this.onClick.bind(this)} value={children} />
            </div>
        );
    }
}

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.displayName = 'Calculator';

        this.resetState = this.resetState.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setDisplay = this.setDisplay.bind(this);
        this.removeLast = this.removeLast.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    resetState() {
        this.state = { display: 0, hist: 0, total:0, operator: null , info:''};
    }

    componentWillMount() {
        this.resetState();
    }

    componentDidMount() { }


    setDisplay(value) {

        let display = this.state.display.toString();

        if ( value === '.' && display.indexOf(value) > -1 ) {
            return;
        }

        display = display == '0' || display == '' ? (value === '.' ? '0.' : value) : display + value;

        this.setState({ display: display });
    }

    calculate(newOperator) {

        let { display, total, operator, hist } = this.state;

        if (display === '') {
            this.setState({ operator: newOperator });
            return;
        }

        if ( operator != null ) {
            if ( operator == '/' && parseFloat(display) == 0){
                this.setState({ info: 'impossível dividir por zero '});
                return;
            }
            total = eval( total + operator + display );
            hist = hist + " " + operator + " " + display;
        }  else {
            hist = total = display;
        }

        this.setState({ display: '', hist: hist, total: total, operator: newOperator, info: '' })

    }

    removeLast() {

        let display = this.state.display.toString().slice(0, -1);

        this.setState({ display: display });

        return display;
    }

    onClick(value, operator) {

        switch(operator) {

            case '-':
            case '+':
            case '*':
            case '/':
                this.calculate(operator); break;

            case 'clear_all':
                this.resetState(); break;

            case 'clear':
                this.setState({ display: 0 });break;

            case '=':
                 this.calculate(); break;

            case 'delete':
                 this.removeLast(); break;

            default:
                this.setDisplay(value); break;
        }
    }

    render() {

        let numeros = [1,2,3,4,5,6,7,8,9,0,'.'];

        let operators = [
            {text:'247', operator:'/'},
            {text:'x',operator:'*'},
            {text:'-', operator:'-'},
            {text:'+', operator:'+'},
        ];

        let actions = [
            //{text:'.'},
            {text:'C', operator:'clear'},
            {text:'CE', operator:'clear_all'},
            {text:'8592', operator:'delete'},
            {text:'=', operator:'='},
        ];

        let value = this.state.display || this.state.total;

        let size = (40*(16/value.toString().length));

        let myStyle = {
            fontSize:  (size > 40 ? '40px' : size+'px')
        };

        return (
            <div>
                <div className="display">
                    <div className="hist"><p className="a">{this.state.hist}<i>{this.state.operator}</i></p></div>
                    <div className="value"><p className="a" style={myStyle} >{value}</p></div>
                    <div className="info"><p>{this.state.info}</p></div>
                </div>
                <div className="buttonArea">
                    <div className="actions">
                        { actions.map( (item, i) => {
                            return <MyButton key={i} onClick={this.onClick} data={item} />
                        } ) }
                    </div>
                    <div className="buttons">
                        { numeros.map( num => {
                            return <MyButton key={num} onClick={this.onClick}>{num}</MyButton>
                        } ) }
                    </div>
                    <div className="operators">
                        { operators.map( (item, i) => {
                            return <MyButton key={i} onClick={this.onClick} data={item} />
                        } ) }
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById('container'));