import React from 'react';
import JsonEditor from '../shared_components/JsonEditor/JsonEditor';

export default class Tablar extends React.Component {
    constructor(props) {
        super(props);
        this._onValueChange = this._onValueChange.bind(this);
        this._onTypeChange = this._onTypeChange.bind(this);
        this._renderCheckbox = this._renderCheckbox.bind(this);
        this._renderRow = this._renderRow.bind(this);
    }
    _onValueChange(key, value) {
        const type = this.props.types[key];
        if (type == 'number') {
            value = +value;
        }
        this.props.onValueChange(key, value);
    }
    _onTypeChange(key, type) {
        this.props.onTypeChange(key, type);
    }
    _renderCheckbox(key, value) {
        const checked = new Boolean(value).valueOf();
        return (
            <input type="checkbox" checked={checked} onChange={() => this._onValueChange(key, !checked)}/>
        );
    }
    _renderJsoneditor(key, value) {
        return (
            <JsonEditor json={value} onChange={json => this._onValueChange(key, json)} />
        );
    }
    _renderRow(key) {
        const propType = this.props.types[key];
        let value = this.props.object[key];
        return (
            <tr key={key}>
                <td className="tablar-key-td">{key}</td>
                <td className="tablar-value-td">
                    {propType == 'boolean' ? this._renderCheckbox(key, value) :
                     propType == 'object' ? this._renderJsoneditor(key, value) :
                        <input type={propType == 'number' ? 'number' : 'text'}
                               value={value}
                               onChange={e => this._onValueChange(key, e.target.value)}/>}
                </td>
                <td>
                    <select value={this.props.types[key]} onChange={e => this._onTypeChange(key, e.target.value)}>
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="object">Object</option>
                    </select>
                </td>
            </tr>
        );
    }
    render() {
        return (
            <div className="tablar">
                <table>
                    <tbody>
                        {Object.keys(this.props.object).map(k => this._renderRow(k))}
                    </tbody>
                </table>
            </div>
        );
    }
}

Tablar.propTypes = {
    object: React.PropTypes.object.isRequired,
    onValueChange: React.PropTypes.func,
    onTypeChange: React.PropTypes.func,
    types: React.PropTypes.object
};

Tablar.defaultProps = {
    onValueChange: (key, value) => {},
    onTypeChange: (key, value) => {},
    types: {}
};