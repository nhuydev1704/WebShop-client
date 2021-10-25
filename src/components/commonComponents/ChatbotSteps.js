import React, { useEffect, useState } from 'react';

const initialState = {
    name: '',
    gender: '',
    age: '',
};
const ChatbotSteps = (props) => {
    const { steps } = props;
    const [info, setInfo] = useState(initialState);

    useEffect(() => {
        const { name, gender, age } = steps;

        setInfo({ ...info, name, gender, age });
    }, [steps]);

    return (
        <div style={{ width: '100%' }}>
            <h3>Summary</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{info.name.value}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{info.gender.value}</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>{info.age.value}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ChatbotSteps;
