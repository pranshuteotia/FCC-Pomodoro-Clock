class App extends React.Component {
    render() {
        return(
            <div className="container">
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>

                <div className="row">
                    <button></button>
                    <button></button>
                </div>

                <div className="row">
                    <h3>Designed and Coded by Pranshu Teotia</h3>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));