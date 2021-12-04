/*
Usually each component gets a separate file in src/Components (except for the App component which goes here)
Unfortunately due to issues with the CDN and JSX compiling with babel standalone
I'm leaving everything in a single js file for now so I don't have to deal with debugging that
Which means it may be a little messy sorry...
*/

// Box component being unnecessary layers are my specialty
// (it's just the part with the header and the form)
class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: "",
            email: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
        });
    }

    async setStatus(guess, email) {
        // fake API to simulate lag times in data fetching
        return new Promise(res => {setTimeout(() => {
                res("success");
            }, 2000)
        });
    }

    render() {
        const headerText = this.props.first ? "COUNT Griffles" : "Think your answer was wrong?";
        const headerClass = this.props.first ? "text-3xl" : "text-2xl";

        return (
            <div id="box" className="flex flex-col items-start static rounded-md border-2 border-black shadow-lg p-5 space-y-3 sm:w-1/2 md:w-1/3 xl:w-1/4">
                <h1 id="header" className={headerClass}>{headerText}</h1>
                <p id="info">Griffles is hiding in a few locations around the website. Guess how many times Griffles appeared!</p> {/*Filler infotext*/}

                {/*Form, but no form tag because don't want page to keep reloading - forms do their own thing in HTML*/}
                <div className="flex flex-row space-x-2">
                    <label htmlFor="guess">Your Guess:</label>
                    <input id="guess" className="rounded-lg border border-black px-1" name="guess" placeholder="number of Griffles" value={this.state.guess} onChange={this.handleChange}></input>
                </div>
                <div className="flex flex-row space-x-2">
                    <label htmlFor="email">Email:</label>
                    <input id="email" className="rounded-lg border border-black px-1" name="email" placeholder="example@xyz.com" value={this.state.email} onChange={this.handleChange}></input>
                </div>
                <button id="submit" className="rounded-full bg-green-500 px-2 py-1 text-white" onClick={this.handleClick}>Submit Guess!</button>
            </div>
        )
    }
}

const Griffles = props => {
    return(
        <div id="Griffles" className="absolute z-1">
            <img id="Griffles" src="../assets/Gariffles.png" alt="Griffles says:"></img>
            {/* Change Gariffles back Griffles when done. It's just difficult to do CSS when the giant griffles img is blocking everything lol */}
            <p id="speech">
                Include me!
            </p>
        </div>
    )
}

// App component contains all the rest of the stuff
// and handles the backend and everything because its the top level component (idk if that's a term)
// Using a stateful component because wHy NOt (too lazy to optimise code rn lol)
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="app" className="relative">
                <Griffles first={true} />
                <Box first={true} />
            </div>
        )
    }
}

const appwrapper = document.getElementById("appwrapper");
ReactDOM.render(<App />, appwrapper);