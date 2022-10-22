import React, { Component, useRef, useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

let taskTitleOutput: string = '';

// navigator.clipboard.readText().then(
//     (clipText) => document.querySelector("#task-title-input").innerText = clipText);
class NameGenerator extends Component {

    state = {
        inputValue: "",
        outputValue: ""
    };

    render() {
        return (
            <div className="container-fluid">
                <Header></Header>
                <Main></Main>
            </div>

        );
    }
}

const CopyToClipboardButton = () => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(taskTitleOutput);
    }
    return (
        <div className="text-center">
            <Button variant={'contained'} startIcon={<ContentPasteIcon/>} onClick={handleClick}>Copia</Button>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
            />
        </div>
    )
}

const Header = () => {
    return (
        <div className={'text-center'}>
            <h1>
                Genera il nome del tuo branch dalla descrizione
            </h1>
        </div>

    )
}

const Main = () => {
    // console.log(this.state.inputValue)
    const inputField = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const [value, setValue] = useState("");
    const [taskTitleOutput, setValue1] = useState("");
    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value);
    const handleChange2 = (e: { target: { value: React.SetStateAction<string>; }; }) => setValue1(e.target.value);
    const taskOutput = ( s: string) => {
        let taskTitleOutput = s
            .split(/\s+/)
            .map((x) => x.toLowerCase())
            .join('-')
            .replace(/[^a-zA-Z0-9\-]/g, '');
        taskTitleOutput = taskTitleOutput.slice(0,3).toUpperCase() + taskTitleOutput.slice(3)
        console.log(taskTitleOutput)
    }
    return (
        <main
            id="main-wrapper"
            className="d-flex flex-wrap justify-content-center align-items-center align-content-center"
        >
            <div className="row w-100 justify-content-center align-items-center">
                <div className="col-xs-12 col-md-10">
                    <div className="input-group my-3">
                        <input
                            id="task-title-input"
                            type="text"
                            ref={inputField}
                            className="form-control"
                            value={value}
                            placeholder="Task's Title (e.g. Bug in error dialog)"
                            aria-label="Task's Title"
                            onChange={handleChange}
                            aria-describedby="generate-branch-name-btn"
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-success"
                                type="button"
                                onClick={event => taskOutput(value)}
                            >
                                Generate!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row w-100 justify-content-center align-items-center">
                <div className="col-xs-12 col-md-10">
                    <div className="input-group my-3">
                        <input
                            id="task-title-output"
                            type="text"
                            className="form-control"
                            placeholder="The result will appear here"
                            value={taskTitleOutput}
                            aria-label="Task's Title"
                            onChange={handleChange2}
                            aria-describedby="copy-to-clipboard-btn"
                            readOnly
                        />
                        <div className="input-group-append">
                            {/*<button*/}
                            {/*    className="btn btn-light"*/}
                            {/*    type="button"*/}
                            {/*    id="copy-to-clipboard-btn"*/}
                            {/*    data-clipboard-target="#task-title-output"*/}
                            {/*    disabled*/}
                            {/*>*/}
                            {/*    Copy to clipboard*/}
                            {/*</button>*/}
                            <CopyToClipboardButton/>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}


export default NameGenerator;
