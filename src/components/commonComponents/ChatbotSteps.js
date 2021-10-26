import React, { useEffect, useState } from 'react';

const initialState = {
    name: '',
    gender: '',
    age: '',
};
const ChatbotSteps = (props) => {
    const { steps } = props;
    console.log('🚀 ~ file: ChatbotSteps.js ~ line 10 ~ ChatbotSteps ~ props', props);
    const [info, setInfo] = useState(initialState);

    useEffect(() => {
        const { name, gender, age } = steps;

        setInfo({ ...info, name, gender, age });
    }, [steps]);

    return (
        <div style={{ width: '100%' }}>
            <h3>Thông tin</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Tên</td>
                        <td>{info.name.value}</td>
                    </tr>
                    <tr>
                        <td>Giới tính</td>
                        <td>{info.gender.value}</td>
                    </tr>
                    <tr>
                        <td>Tuổi</td>
                        <td>{info.age.value}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ChatbotSteps;
