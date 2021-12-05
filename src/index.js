/*
Usually each component gets a separate file in src/Components (except for the App component which goes here)
Unfortunately due to issues with the CDN and JSX compiling with babel standalone
I'm leaving everything in a single js file for now so I don't have to deal with debugging that
Which means it may be a little messy sorry...
*/

// Box component: unnecessary layers are my specialty
// (it's just the part with the header and the form)
class Box extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first: true,
            guess: "",
            email: "",
            status: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        const load = await this.getStatus();
        this.setState(load);
    }

    handleChange(event) {
        const field = event.target.name; // cheating a bit here... but it's fine, right?
        this.setState(state => ({
            ...state,
            [field]: event.target.value,
        }));
    }

    async handleClick() {
        const status = await this.setStatus(this.state.guess, this.state.email);
        
        this.setState({
            guess: "",
            email: "",
            status: (status == 1) ? "Success! You answer has been submitted." : "Oops! Something went wrong. "
        });
    }

    // fake API to simulate lag times in data fetching
    async getStatus() {
        return new Promise(res => {setTimeout(() => {
                res({
                    first: false,
                    guess: "5",
                    email: "xyz@abc.com"
                });
            }, 2000)
        });
    }

    // fake API to simulate lag times in data fetching
    async setStatus(guess, email) {
        return new Promise(res => {setTimeout(() => {
                res(1);
            }, 2000)
        });
    }

    render() {
        const headerText = this.state.first ? "COUNT Griffles" : "Think your answer was wrong?";
        const headerClass = this.state.first ? "text-3xl" : "text-2xl";
        const statusElement = (this.state.status != "") ? <p id="success" className="bg-green-200 p-2">{this.state.status}</p> : null;

        return (
            <div id="box" className="container flex flex-col items-start sm:w-1/2 md:w-1/3 xl:w-1/4">
                <Griffles first={this.state.first} />

                <div className="static rounded-md border-2 border-black shadow-lg p-5 space-y-3">
                    <h1 id="header" className={headerClass}>{headerText}</h1>
                    <p id="info">Griffles is hiding in a few locations around the website. Guess how many times Griffles appeared!</p> {/*Filler infotext*/}

                    {/*Form, but no form tag because don't want page to keep reloading - forms do their own thing in HTML*/}
                    <div id="main-content" className="flex flex-row space-x-2">
                        <label htmlFor="guess">Your Guess:</label>
                        <input id="guess" className="rounded-lg border border-black px-1" name="guess" placeholder="number of Griffles" value={this.state.guess} onChange={this.handleChange}></input>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <label htmlFor="email">Email:</label>
                        <input id="email" className="rounded-lg border border-black px-1" name="email" placeholder="example@xyz.com" value={this.state.email} onChange={this.handleChange}></input>
                    </div>
                    <button id="submit" className="rounded-full bg-green-500 px-2 py-1 text-white" onClick={this.handleClick}>Submit Guess!</button>
                    
                    {statusElement}
                </div>
            </div>
        )
    }
}

const Griffles = props => {
    return(
        <div id="Griffles" className="relative z-1">
            <img id="Griffles" className="w-2/3" src="../assets/Griffles.png" alt="Griffles says:"></img>
        </div>
    )
}

// App component contains all the rest of the stuff
// and handles the backend and everything because its the top level component (idk if that's a term)
// after changing up the logic a bit, the BOX component now handles the calls and stuff (as you can see, unnecessary layers but yay)
// which makes this pretty useless but I always like having 1 top level component to contain everything else, in case need to add other components or whatever
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="app" className="relative">
                <Box />
            </div>
        )
    }
}

const appwrapper = document.getElementById("appwrapper");
ReactDOM.render(<App />, appwrapper);