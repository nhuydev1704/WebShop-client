import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LaptopIcon from '@mui/icons-material/Laptop';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SpeakerIcon from '@mui/icons-material/Speaker';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useContext } from 'react';
import { ContextHook } from '../../../ContextHook';

const listIcon = [
    <AllInboxIcon />,
    <AccessAlarmIcon />,
    <LaptopIcon />,
    <HeadphonesIcon />,
    <PhoneIphoneIcon />,
    <SpeakerIcon />,
    <EventSeatIcon />,
    <DesktopMacIcon />,
];

const FilterCategory = () => {
    const state = useContext(ContextHook);
    const [category, setCategory] = state.productsAPI.category;
    const [search, setSearch] = state.productsAPI.search;
    const [categories] = state.categoriesAPI.categories;
    const [value, setValue] = React.useState(0);

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFilterCategory = (id) => {
        if (id === '') {
            setCategory('');
        } else {
            setCategory('category=' + id);
            setSearch('');
        }
    };

    return (
        <List>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab
                    onClick={() => handleFilterCategory('')}
                    label={
                        <ListItem button key={999}>
                            <ListItemIcon>{listIcon[0]}</ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{
                                    fontSize: 15,
                                    fontWeight: 'medium',
                                    lineHeight: '20px',
                                    padding: '2px 0',
                                    color: 'rgba(0,0,0,.7)',
                                }}
                                secondaryTypographyProps={{
                                    noWrap: true,
                                    fontSize: 12,
                                    lineHeight: '16px',
                                    color: 'rgba(0,0,0,0)',
                                }}
                                sx={{ my: 0 }}
                                primary={'Tất cả'}
                            />
                        </ListItem>
                    }
                    {...a11yProps(0)}
                />
                {categories &&
                    categories.map((item, index) => (
                        <Tab
                            key={index}
                            onClick={() => handleFilterCategory(item._id)}
                            label={
                                <ListItem button key={item._id}>
                                    <ListItemIcon>{listIcon[index + 1]}</ListItemIcon>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            fontSize: 15,
                                            fontWeight: 'medium',
                                            lineHeight: '20px',
                                            padding: '2px 0',
                                            color: 'rgba(0,0,0,.7)',
                                        }}
                                        secondaryTypographyProps={{
                                            noWrap: true,
                                            fontSize: 12,
                                            lineHeight: '16px',
                                            color: 'rgba(0,0,0,0)',
                                        }}
                                        sx={{ my: 0 }}
                                        primary={item.name}
                                    />
                                </ListItem>
                            }
                            {...a11yProps(index + 1)}
                        />
                    ))}
            </Tabs>
        </List>
    );
};

export default FilterCategory;
