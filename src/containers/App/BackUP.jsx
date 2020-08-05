import React, {Component} from 'react';

class App extends Component {
    state = {
        selectedFile: null,
        imagePreviewUrl: null,
    };

    fileChangedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
        });

        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result,
            });
        };

        reader.readAsDataURL(event.target.files[0]);
    };

    submit = () => {
        const fd = new FormData();

        // eslint-disable-next-line react/destructuring-assignment
        fd.append('file', this.state.selectedFile);

        const request = new XMLHttpRequest();

        // eslint-disable-next-line func-names
        request.onreadystatechange = function () {
            if (this.readyState === 4 || this.status === 200) {
                console.log("Uploaded !! ");
            }
        };
        console.log("★ fd : ", fd);
        request.open("POST", "http://127.0.0.1:8081/v1/users/fileUpload", true);
        request.send(fd);
    };

    render() {
        let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
        // eslint-disable-next-line react/destructuring-assignment
        if (this.state.imagePreviewUrl) {
            // eslint-disable-next-line react/destructuring-assignment
            $imagePreview = (<div className="image-container"><img src={this.state.imagePreviewUrl} alt="icon" width="200"/></div>);
        }

        return (
            <div className="App">
                <input type="file" name="avatar" onChange={this.fileChangedHandler}/>
                <button type="button" onClick={this.submit}> Upload</button>
                {$imagePreview}
            </div>
        );
    }
}

export default App;
