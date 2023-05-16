import React, { Component } from 'react';

class TextFileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileContent: '',
      isDropdownOpen: false,
      isFileUploaded: false,
    };
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      this.setState({ fileContent: content, isFileUploaded: true });
    };

    reader.readAsText(file);
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  renderContent() {
    const { fileContent, isDropdownOpen } = this.state;

    if (fileContent) {
      const lines = fileContent.trim().split('\n');

      return (
        <div>
          <button onClick={this.toggleDropdown} 
          style={{ textAlign: 'center',
          backgroundColor: '#1a202c' }}>
            {isDropdownOpen ? 'Close' : 'Open'} Annotations
          </button>
          {isDropdownOpen && (
            <div style={dropdownStyle}>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Abnormality</th>
                    <th>Time</th>
                    <th>Channel</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line, index) => {
                    const [abnormality, time, channel] = line.split(' ');

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{abnormality}</td>
                        <td>{time}</td>
                        <td>{channel}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }

    return null;
  }

  render() {
    const { isFileUploaded } = this.state;

    return (
      <div style={{ textAlign: 'center' }}>
        {!isFileUploaded && (
          <div>
            <h1 style={{color:"#1a202c"}}>Import Annotations</h1>
            <input
              type="file"
              accept=".txt"
              onChange={this.handleFileChange}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px 12px',
                margin: '10px',
                backgroundColor: '#f5f5f5',
                color: '#1a202c',
                fontSize: '16px',
                width: '300px',
                boxShadow: 'none',
              }}
            />
          </div>
        )}
        <div style={{ margin: '20px auto', width: '80%', textAlign: 'left' }}>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const dropdownStyle = {
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '10px',
  display: 'block',
};

export default TextFileUploader;
