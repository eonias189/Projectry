import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./devPage.module.css";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { ProjectData } from "../types";
import { projectDataActions } from "../store/reducers/projectDataReducer";

interface DevPageProps {}

type DevPageParams = {
    projectID: string;
};

const defMod = {
    name: "some module name",
    moduleID: "some module id",
    objectsID: ["some object id"],
    functionsID: ["some function id"],
    depencies: [],
};

const defFun = {
    name: "some function name",
    functionID: defMod.functionsID[0],
    parameters: [{ name: "some par" }],
};
const defObj = {
    name: "some obj name",
    objectID: defMod.objectsID[0],
    fields: [{ name: "some field" }],
    methodsID: ["some method id"],
};

const defMet = {
    name: "some method name",
    functionID: defObj.methodsID[0],
    parameters: [{ name: "some anothe par" }],
};

const DevPage: FC<DevPageProps> = ({}) => {
    const navigate = useNavigate();
    const { projectID } = useParams<DevPageParams>();
    const projectData = useAppSelector((state) => state.projectData);
    const project = useAppSelector((state) => state.allProjects.find((project) => project.id == projectID));
    const dispatch = useAppDispatch();
    useEffect(() => {
        const act = projectDataActions.insertProjectData({
            projectData: {
                modules: [defMod],
                functions: [defFun, defMet],
                objects: [defObj],
            },
        });
        dispatch(act);
    }, []);

    const delete_module = () => {
        const act = projectDataActions.deleteModule({ moduleID: defMod.moduleID });
        dispatch(act);
    };
    const delete_obj = () => {
        const act = projectDataActions.deleteObject({ objectID: defMod.objectsID[0] });
        dispatch(act);
    };
    const delete_function = () => {
        const act = projectDataActions.deleteFunction({ functionID: defMod.functionsID[0] });
        dispatch(act);
    };

    const delete_method = () => {
        const act = projectDataActions.deleteMethod({ methodID: defMet.functionID });
        dispatch(act);
    };

    const add_module = () => {
        const act = projectDataActions.addModule({ module: defMod });
        dispatch(act);
    };

    const add_func = () => {
        const act = projectDataActions.addFunction({ func: defFun, moduleID: defMod.moduleID });
        dispatch(act);
    };

    const add_obj = () => {
        const act = projectDataActions.addObject({ object: defObj, moduleID: defMod.moduleID });
        dispatch(act);
    };

    const add_method = () => {
        const act = projectDataActions.addMethod({ method: defMet, objectID: defObj.objectID });
        dispatch(act);
    };

    return (
        <div className={styles.devPage}>
            <p>Dev Page</p>
            <p>path: {project?.path}</p>
            <p>modules: {JSON.stringify(projectData.modules)}</p>
            <p>objects: {JSON.stringify(projectData.objects)}</p>
            <p>functions: {JSON.stringify(projectData.functions)}</p>
            <button onClick={add_module}>add module</button>
            <button onClick={add_func}>add func</button>
            <button onClick={add_obj}>add obj</button>
            <button onClick={add_method}>add method</button>
            <button onClick={delete_module}>del module</button>
            <button onClick={delete_obj}>del obj</button>
            <button onClick={delete_function}>del func</button>
            <button onClick={delete_method}>del method</button>
            <button onClick={() => navigate("/")}>to main</button>
        </div>
    );
};

export default DevPage;
