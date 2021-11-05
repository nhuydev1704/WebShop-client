import ChatBot from 'react-simple-chatbot';
import SmsIcon from '@mui/icons-material/Sms';
import React, { useState } from 'react';
import ChatbotSteps from './ChatbotSteps';

const ChatbotComponet = () => {
    return (
        <ChatBot
            floatingIcon={<SmsIcon style={{ color: 'white' }} />}
            handleEnd={(renderedSteps, steps, values) => {
                console.log({ renderedSteps, steps, values });
            }}
            placeholder="Trợ lý thương mại..."
            floating={true}
            headerTitle="Trợ lý thương mại"
            steps={[
                {
                    id: '1',
                    message: 'Tên bạn là gì?',
                    trigger: 'name',
                },
                {
                    id: 'name',
                    user: true,
                    trigger: '3',
                },
                {
                    id: '3',
                    message: 'Chào {previousValue}! giới tính bạn gì?',
                    trigger: 'gender',
                },
                {
                    id: 'gender',
                    options: [
                        { value: 'male', label: 'Nam', trigger: '5' },
                        { value: 'female', label: 'Nữ', trigger: '5' },
                    ],
                },
                {
                    id: '5',
                    message: 'Bạn bao nhiêu tuổi?',
                    trigger: 'age',
                },
                {
                    id: 'age',
                    user: true,
                    trigger: '7',
                    validator: (value) => {
                        if (isNaN(value)) {
                            return 'value must be a number';
                        } else if (value < 0) {
                            return 'value must be positive';
                        } else if (value > 120) {
                            return `${value}? Come on!`;
                        }

                        return true;
                    },
                },
                {
                    id: '7',
                    message: 'Thông tin của bạn là!',
                    trigger: 'review',
                },
                {
                    id: 'review',
                    component: <ChatbotSteps />,
                    asMessage: true,
                    trigger: 'update',
                },
                {
                    id: 'update',
                    message: 'Bạn có muốn cập nhật lại thông tin?',
                    trigger: 'update-question',
                },
                {
                    id: 'update-question',
                    options: [
                        { value: 'yes', label: 'Có', trigger: 'update-yes' },
                        { value: 'no', label: 'Không', trigger: 'end-message' },
                    ],
                },
                {
                    id: 'update-yes',
                    message: 'Bạn muốn cập nhật thông tin gì?',
                    trigger: 'update-fields',
                },
                {
                    id: 'update-fields',
                    options: [
                        { value: 'name', label: 'Tên?', trigger: 'update-name' },
                        { value: 'gender', label: 'Giới tính?', trigger: 'update-gender' },
                        { value: 'age', label: 'Tuổi', trigger: 'update-age' },
                    ],
                },
                {
                    id: 'update-name',
                    update: 'name',
                    trigger: '7',
                },
                {
                    id: 'update-gender',
                    update: 'gender',
                    trigger: '7',
                },
                {
                    id: 'update-age',
                    update: 'age',
                    trigger: '7',
                },
                {
                    id: 'end-message',
                    message: 'Chúc bạn mua sắm vui vẻ!',
                    end: true,
                },
            ]}
        />
    );
};

export default ChatbotComponet;
