import React from 'react';
import ReactDOM from 'react-dom/client';


interface ThemeSwitcherProps {
    class?: string,
    label: string,
}

declare const api: {
    getApp: () => Promise<any>
};

class ThemeSwitcher extends React.Component<ThemeSwitcherProps> {
    static defaultProps = { class: "theme-switcher", };
    bodyElement: HTMLElement = document.body

    constructor(props: ThemeSwitcherProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        setTimeout(() => {
            api.getApp().then(
                app => alert((app as {name: string}).name)
            )
        }, 1500);
        this.bodyElement.classList.toggle('dark');
    }

    render() {
        return <button className={this.props.class} onClick={this.handleClick}>{this.props.label}</button>
    }
}

class App extends React.Component {
    render() {
        return <div>
            <ThemeSwitcher label='theme-switcher'/>
        </div>
    }
}


const appElement = document.getElementById("app");
const root = ReactDOM.createRoot(appElement);
root.render(
    <App />
)