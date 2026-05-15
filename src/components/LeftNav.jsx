import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const menu = [
    {
        id: 1,
        title: 'Dashboard',
        icon: <DashboardOutlinedIcon />,
        active: false
    },
    {
        id: 2,
        title: 'Users',
        icon: <PeopleAltOutlinedIcon />,
        active: true
    },
    {
        id: 3,
        title: 'Teams',
        icon: <GroupsOutlinedIcon />,
        active: false
    },
    {
        id: 4,
        title: 'Reports',
        icon: <BarChartOutlinedIcon />,
        active: false
    },
    {
        id: 5,
        title: 'Settings',
        icon: <SettingsOutlinedIcon />,
        active: false
    }
];

export default function LeftNav() {
    return (
        <div className='w-1/5 '>
            <Box className='bg-[#e7e7ea] pl-12 py-4'>
                <Typography variant="h3" className='text-[#0000CC] font-bold text-[18px]'>CoprAdmin</Typography>
                <Typography className='text-[#464647]'>Enterprice Portal</Typography>
            </Box>
            <Box className='bg-[#e7e7ea]'>
                {menu.map((el) => {
                    return (
                        <ListItem key={el.id} disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: el.active ? '#0000CC' : 'rgba(0, 0, 0, 0.54)' }}>
                                    {el.icon}
                                </ListItemIcon>
                                <ListItemText primary={el.title} primaryTypographyProps={{
                                    fontSize: '14px',
                                    fontWeight: el.active ? 600 : 400,
                                    color: el.active ? '#0000CC' : 'inherit'
                                }}>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </Box>
        </div>
    )
}
