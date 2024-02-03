import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./devPage.module.css";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { TFunction, TInterface, TModule, TObject } from "../types";
import { projectDataActions } from "../store/reducers/projectDataReducer";

interface DevPageProps {}

type DevPageParams = {
    projectID: string;
};

const defFun: TFunction = {
    name: "some function name",
    id: "some func id",
    signature: {
        name: "-",
        parameters: [{ name: "some par" }],
    },
};
const defObj: TObject = {
    name: "some obj name",
    id: "some obj id",
    fields: [{ name: "some field" }],
    methods: [
        {
            name: "do_somth",
            parameters: [{ name: "OnePar" }],
        },
    ],
};

const defINterface: TInterface = {
    name: "some interface",
    id: "some interface id",
    fields: [{ name: "name", typeHint: "string" }],
    methods: [
        {
            name: "some method",
            parameters: [],
            returnType: "string",
        },
    ],
};
const defMod: TModule = {
    name: "some module name",
    id: "some module id",
    children: {
        objects: [defObj.id],
        functions: [defFun.id],
        interfaces: [defINterface.id],
    },
    depencies: {
        objects: [],
        functions: [],
        interfaces: [],
    },
};

const DevPage: FC<DevPageProps> = ({}) => {
    const navigate = useNavigate();
    const { projectID } = useParams<DevPageParams>();
    const projectData = useAppSelector((state) => state.projectData);
    const project = useAppSelector((state) => state.allProjects.find((project) => project.id == projectID));
    const dispatch = useAppDispatch();
    useEffect(() => {
        const act = projectDataActions.insertProjectData({
            modules: [
                defMod,
                {
                    name: "another",
                    id: "module-2",
                    children: {
                        objects: [],
                        functions: [],
                        interfaces: [],
                    },
                    depencies: {
                        objects: [],
                        functions: [],
                        interfaces: [],
                    },
                },
            ],
            functions: [defFun],
            objects: [defObj],
            interfaces: [defINterface],
        });
        dispatch(act);
    }, []);

    const delete_module = () => {
        const act = projectDataActions.deleteElement({ key: "modules", id: defMod.id });
        dispatch(act);
    };
    const delete_obj = () => {
        const act = projectDataActions.deleteElement({ key: "objects", id: defObj.id });
        dispatch(act);
    };
    const delete_function = () => {
        const act = projectDataActions.deleteElement({ key: "functions", id: defFun.id });
        dispatch(act);
    };
    const delete_interface = () => {
        const act = projectDataActions.deleteElement({ key: "interfaces", id: defINterface.id });
        dispatch(act);
    };

    /* const delete_method = () => {
        const act = projectDataActions.deleteMethod({ methodID: defMet.id });
        dispatch(act);
    }; */

    const add_module = () => {
        const act = projectDataActions.addElement({ key: "modules", element: defMod });
        dispatch(act);
    };
    const add_func = () => {
        const act = projectDataActions.addElement({ key: "functions", element: defFun });
        dispatch(act);
    };

    const add_obj = () => {
        const act = projectDataActions.addElement({ key: "objects", element: defObj });
        dispatch(act);
    };

    const addInterface = () => {
        const act = projectDataActions.addElement({
            key: "interfaces",
            element: defINterface,
        });
        dispatch(act);
    };

    const swapObj = () => {
        const idModuleNow = projectData.modules.find((module) =>
            module.children.objects.includes(defObj.id)
        )!;
        const idModuleNext = projectData.modules.find(
            (module) => !module.children.objects.includes(defObj.id)
        )!;
        const act1 = projectDataActions.addToChildren({
            childType: "objects",
            id: idModuleNext.id,
            child: defObj.id,
        });
        const act2 = projectDataActions.deleteFromChildren({
            childType: "objects",
            id: idModuleNow.id,
            child: defObj.id,
        });
        dispatch(act1);
        dispatch(act2);
    };

    const editMethod = () => {
        const method = projectData.objects[0].methods[0];
        const newParName = method.parameters[0].name === "OnePar" ? "SecPar" : "OnePar";
        const newMethod = {
            ...method,
            parameters: [{ name: newParName, typeHint: method.parameters[0].typeHint }],
        };
        const act = projectDataActions.editElement({
            key: "objects",
            id: projectData.objects[0].id,
            newElement: { ...projectData.objects[0], methods: [newMethod] },
        });
        dispatch(act);
    };

    return (
        <div className={styles.devPage}>
            <p>Dev Page</p>
            <p>path: {project?.path}</p>
            <p>
                modules:{" "}
                {JSON.stringify(
                    projectData.modules.map((module) => ({
                        id: module.id,
                        objects: module.children.objects,
                        functions: module.children.functions,
                        interfaces: module.children.interfaces,
                    }))
                )}
            </p>
            <p>
                objects:{" "}
                {JSON.stringify(projectData.objects.map((obj) => ({ id: obj.id, methods: obj.methods })))}
            </p>
            <p>
                functions:{" "}
                {JSON.stringify(
                    projectData.functions.map((func) => ({
                        id: func.id,
                        params: func.signature.parameters,
                    }))
                )}
            </p>
            <p>interfaces: {JSON.stringify(projectData.interfaces.map((int) => ({ id: int.id })))}</p>
            <button onClick={add_module}>add module</button>
            <button onClick={add_func}>add func</button>
            <button onClick={add_obj}>add obj</button>
            <button onClick={addInterface}>add interface</button>
            <button onClick={delete_module}>del module</button>
            <button onClick={delete_obj}>del obj</button>
            <button onClick={delete_function}>del func</button>
            <button onClick={delete_interface}>delete interface</button>
            <button onClick={swapObj}>Swap object</button>
            <button onClick={editMethod}>Edit Method</button>
            <button onClick={() => navigate("/")}>to main</button>
        </div>
    );
};

export default DevPage;
