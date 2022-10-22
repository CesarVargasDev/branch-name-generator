import React, { Component } from 'react';
import { Button, Snackbar } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

type MyState = {inputTaskTitle: string, outputTaskTitle: string, open: boolean};
class NameGenerator extends Component<{}, MyState> {

    constructor({ props }: {props: any}) {
        super(props);
        this.state = { inputTaskTitle: '', outputTaskTitle: '', open: false };
    }

    render() {
        return <>
            <Header/>
            <div
                id="main-wrapper"
                className="d-flex flex-wrap justify-content-center align-items-center align-content-center"
            >
                <div className="row w-100 justify-content-center align-items-center">
                    <div className="col-xs-12 col-md-10">
                        <div className="input-group my-3">
                            <input
                                id="task-title-input"
                                type="text"
                                className="form-control"
                                value={this.state.inputTaskTitle}
                                placeholder="Task's Title (e.g. Bug in error dialog)"
                                aria-label="Task's Title"
                                onChange={this.handleChange}
                                aria-describedby="generate-branch-name-btn"
                            />
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
                                value={this.state.outputTaskTitle}
                                aria-label="Task's Title"
                                aria-describedby="copy-to-clipboard-btn"
                                readOnly
                            />
                            <div className="input-group-append">
                                <div className="text-center">
                                    <Button variant={'contained'} startIcon={<ContentPasteIcon/>}
                                            onClick={this.handleClipboard}>Copia</Button>
                                    <Snackbar
                                        open={this.state.open}
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        onClose={() => this.setOpen(false)}
                                        autoHideDuration={2000}
                                        message="Copied to clipboard"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    }


    handleChange = (e: {target: {value: string;};}) => {
        let temp = e.target.value
            .split(/\s+/)
            .map((x) => x.toLowerCase())
            .join('-')
            .replace(/[^a-zA-Z0-9-]/g, '');
        temp = temp.slice(0, 3).toUpperCase() + temp.slice(3)
        this.setState({ inputTaskTitle: e.target.value, outputTaskTitle: temp });
    }

    setOpen = (bool: boolean) => {
        this.setState({ open: bool })
    }
    handleClipboard = () => {
        this.setOpen(true)
        navigator.clipboard.writeText(this.state.outputTaskTitle);
    }

}

class Header extends Component {
    render() {
        return (
            <div className={'text-center'}>
                <h1>
                    Genera il nome del tuo branch dalla descrizione
                </h1>
            </div>

        )
    }
}

export default NameGenerator;
