import React, { FC } from "react";
import StyledButton from "./UI/StyledButton/StyledButton";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

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
        return <StyledButton onClick={this.handleClick}>addProject</StyledButton>;
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
        return <StyledButton onClick={this.handleClick}>getProjects</StyledButton>;
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
        return <StyledButton onClick={this.handleClick}>removeProject</StyledButton>;
    }
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
    const body = document.body;
    const [someState, setSomeState] = React.useState<boolean>(false);
    const handleClick = () => {
        body.classList.toggle("dark");
        setSomeState(!someState);
    };
    return (
        <StyledButton onClick={handleClick}>
            Theme Switcher({someState ? "переключено" : "непереключено"})
        </StyledButton>
    );
};

const MainPage: FC = () => {
    return (
        <div>
            <ThemeSwitcher label="theme-switcher" />
            <GetProjects />
            <AddProject path="wasAdded" alive={true} />
            <RemoveProject path="wasAdded" />
            <NavLink to="/page2">На 2 страницу</NavLink>
        </div>
    );
};

const Page2: FC = () => {
    return (
        <>
            <p> Page 2</p>
            <NavLink to="/">На главную страницу</NavLink>
        </>
    );
};

const App: FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/page2" element={<Page2 />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
