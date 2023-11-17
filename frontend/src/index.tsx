import React from "react";
import ReactDOM from "react-dom/client";
import "./index";

interface ThemeSwitcherProps {
    class?: string;
    label: string;
}

interface AddProjectProps {
    path: string;
    alive: boolean;
    class?: string;
    timeout?: number;
}

class AddProject extends React.Component<AddProjectProps> {
    static defaultProps = { timeout: 500, class: "api-user btn" };
    constructor(props: AddProjectProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    private async handleClick() {
        let project = await api().newProject(this.props.path, this.props.alive);
        setTimeout(() => {
            api()
                .addProject(project)
                .catch(() => alert("Ошибка!"));
        }, this.props.timeout);
    }

    public render(): React.ReactNode {
        return (
            <button className={this.props.class} onClick={this.handleClick}>
                addProject
            </button>
        );
    }
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

    private handleClick() {
        setTimeout(
            () =>
                api()
                    [this.props.channel](...this.props.args)
                    .then((resp) => alert(JSON.stringify(resp)))
                    .catch(() => alert("Ошибка!")),
            this.props.timeout
        );
    }

    public render(): React.ReactNode {
        return (
            <button onClick={this.handleClick} className={this.props.class}>
                {this.props.channel}
            </button>
        );
    }
}

class ThemeSwitcher extends React.Component<ThemeSwitcherProps> {
    static defaultProps = { class: "theme-switcher btn" };
    private bodyElement: HTMLElement = document.body;

    constructor(props: ThemeSwitcherProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick() {
        this.bodyElement.classList.toggle("dark");
    }

    public render(): React.ReactNode {
        return (
            <button className={this.props.class} onClick={this.handleClick}>
                {this.props.label}
            </button>
        );
    }
}

class App extends React.Component {
    public render(): React.ReactNode {
        return (
            <div>
                <ThemeSwitcher label="theme-switcher" />
                <ApiUser channel="newProject" args={["path", true]} />
                <ApiUser channel="getProjects" args={[]} />
                <AddProject path="wasAdded" alive={true} />
                <ApiUser channel="removeProject" args={["wasAdded"]} />
            </div>
        );
    }
}

const appElement = document.getElementById("app");
const root = ReactDOM.createRoot(appElement);
root.render(<App />);
