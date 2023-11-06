import React from "react";
import ReactDOM from "react-dom/client";
import "./index";

interface ThemeSwitcherProps {
    class?: string;
    label: string;
}

interface ApiUserProps {
    class?: string;
    channel: string;
    args: any[];
    timeout?: number;
}

class ApiUser extends React.Component<ApiUserProps> {
    static defaultProps = { timeout: 500, class: "api-user btn" };
    constructor(props: ApiUserProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        setTimeout(
            () =>
                api[this.props.channel](...this.props.args).then((resp) =>
                    alert(resp)
                ),
            this.props.timeout
        );
    }

    render(): React.ReactNode {
        return (
            <button onClick={this.handleClick} className={this.props.class}>
                {this.props.channel}
            </button>
        );
    }
}

class ThemeSwitcher extends React.Component<ThemeSwitcherProps> {
    static defaultProps = { class: "theme-switcher btn" };
    bodyElement: HTMLElement = document.body;

    constructor(props: ThemeSwitcherProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.bodyElement.classList.toggle("dark");
    }

    render(): React.ReactNode {
        return (
            <button className={this.props.class} onClick={this.handleClick}>
                {this.props.label}
            </button>
        );
    }
}

class App extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
                <ThemeSwitcher label="theme-switcher" />
                <ApiUser channel="getMyFeature" args={["Serg"]} />
                <ApiUser channel="getSumNums" args={[2, 2]} />
            </div>
        );
    }
}

const appElement = document.getElementById("app");
const root = ReactDOM.createRoot(appElement);
root.render(<App />);
