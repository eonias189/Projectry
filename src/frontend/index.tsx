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
                .then(alert)
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

interface GetProjectsProps {
    class?: string;
    timeout?: number;
}

class GetProjects extends React.Component<GetProjectsProps> {
    static defaultProps = { timeout: 500, class: "api-user btn" };
    constructor(props: GetProjectsProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    private async handleClick() {
        setTimeout(() => {
            api()
                .getProjects()
                .then((projects) => alert(JSON.stringify(projects)))
                .catch(() => alert("Ошибка!"));
        }, this.props.timeout);
    }

    public render(): React.ReactNode {
        return (
            <button className={this.props.class} onClick={this.handleClick}>
                getProjects
            </button>
        );
    }
}

interface RemoveProjectProps {
    path: string;
    class?: string;
    timeout?: number;
}

class RemoveProject extends React.Component<RemoveProjectProps> {
    static defaultProps = { timeout: 500, class: "api-user btn" };
    constructor(props: RemoveProjectProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    private async handleClick() {
        setTimeout(() => {
            api()
                .removeProject(this.props.path)
                .then(alert)
                .catch(() => alert("Ошибка!"));
        }, this.props.timeout);
    }

    public render(): React.ReactNode {
        return (
            <button className={this.props.class} onClick={this.handleClick}>
                removeProject
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
                <GetProjects />
                <AddProject path="wasAdded" alive={true} />
                <RemoveProject path="wasAdded" />
            </div>
        );
    }
}

const appElement = document.getElementById("app");
const root = ReactDOM.createRoot(appElement as HTMLElement);
root.render(<App />);
