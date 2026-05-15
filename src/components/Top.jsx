import { CheckBox, SearchOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function Top() {
    const api = 'https://6915d6e5465a9144626dca39.mockapi.io/1/todo';
    const [users, setUsers] = useState([])
    const [fix, setFix] = useState(null)
    const openDrop = Boolean(fix)

    const [open, setOpen] = useState(false)

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [image, setImage] = useState('')
    const [status, setStatus] = useState('Online')

    const [ename, setEname] = useState('')
    const [eage, setEage] = useState('')
    const [eimage, setEimage] = useState('')
    const [estatus, setEstatus] = useState('Online')
    const [eopen, setEopen] = useState(false)
    const [idx, setIdx] = useState(null)

    const [active, setActive] = useState(null)

    const [search, setSearch]=useState('')


    function handleMoreClick(event, user) {
        setFix(event.currentTarget)
        setActive(user)
    }
    function handleMoreClose() {
        setFix(null)
    }

    async function get() {
        try {
            let { data } = await axios.get(api)
            console.log(data);
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    }
    async function edStat(id, st) {
        try {
            await axios.patch(`${api}/${id}`, { status: st })
            setUsers(users.map((el) => el.id == id ? { ...el, status: st } : el))
        } catch (error) {
            console.log(error);
        }
    }
    async function addUser() {
        const newUser = {
            name,
            age,
            status: status === 'Online',
            id: Date.now(),
            image
        }
        try {
            await axios.post(api, newUser)
            setUsers([...users, newUser])
            setOpen(false)
            setName('')
            setAge('')
            setImage('')
            setStatus('Online')
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteUser(id) {
        try {
            setFix(null)
            await axios.delete(`${api}/${id}`)
            setUsers((prev) => prev.filter((el) => el.id != id))
        } catch (error) {
            console.log(error);
        }
    }
    function editUser(el) {
        setEname(el.name)
        setEimage(el.image)
        setEage(el.age)
        setEstatus(el.status ? 'Online' : 'Offline')
        setEopen(true)
        setIdx(el.id)
        console.log(el);
        
    }

    async function edUser() {
        let upUser = {
            id: idx,
            name: ename,
            image: eimage,
            age: eage,
            status: estatus == 'Online'
        }
        try {
            await axios.put(`${api}/${idx}`, upUser)
            setUsers(users.map((el) => { el.id == idx ? upUser : el }))
            setEopen(false)
            setIdx(null)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        get();
    }, []);

    let filterUsers=users.filter(user=>user.name.toLowerCase().includes(search.toLowerCase()))
    return (
        <Box sx={{
            width: 'full',
            p: 1
        }}>
            <Stack alignItems="center" direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: 32 }}>Users</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <SearchOutlined sx={{ fontSize: 40 }} />
                    <TextField
                        onChange={(e)=>setSearch(e.target.value)}
                        placeholder="Search..."
                        sx={{
                            width: 300,
                            backgroundColor: '#fff',
                            '& .MuiOutlinedInput-root': { pr: 0 }
                        }}
                    />

                    <Select
                        variant="standard"
                        disableUnderline
                        defaultValue="All"
                        sx={{
                            borderLeft: '1px solid #ccc',
                            height: '100%',
                            px: 1,
                            fontSize: '14px'
                        }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                    </Select>
                </Stack>
                <Button variant="contained" onClick={() => setOpen(true)}>+ Add User</Button>
            </Stack>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>

                            <TableCell width={50}>Avatar</TableCell>
                            <TableCell width={270}>Full Name</TableCell>
                            <TableCell width={50}>Age</TableCell>
                            <TableCell width={60}>Status</TableCell>
                            <TableCell width={140}>Status control</TableCell>
                            <TableCell width={50}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((el) => {
                            return (
                                <TableRow key={el.id}>
                                    <TableCell><Avatar src={el.image} /></TableCell>
                                    <TableCell>{el.name}</TableCell>
                                    <TableCell>{el.age}</TableCell>
                                    <TableCell><Typography sx={{
                                        color: el.status ? "#0000CC" : '',
                                        fontWeight: '500'
                                    }}>{el.status ? "online" : 'offline'}</Typography></TableCell>
                                    <TableCell>
                                        <Checkbox checked={el.status} onChange={(e) => edStat(el.id, e.target.checked)} />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={(e) => handleMoreClick(e, el)}>
                                            <MoreVertIcon />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>






            <Dialog
                open={open}
                onClose={''}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog">
                <DialogTitle id="alert-dialog-title">
                    {"Add New User"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ width: 320 }}>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                                Image
                            </Typography>
                            <TextField
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                fullWidth
                                placeholder="url.."
                                size="small"
                                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#F9FAFB' } }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                                Full Name
                            </Typography>
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                placeholder="Jane Doe"
                                size="small"
                                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#F9FAFB' } }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                                Age
                            </Typography>
                            <TextField
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                fullWidth
                                placeholder="34"
                                size="small"
                                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#F9FAFB' } }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
                                Status
                            </Typography>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                fullWidth
                                size="small"
                                defaultValue="Online"
                                sx={{ bgcolor: '#F9FAFB' }}
                            >
                                <MenuItem value="Online">Online</MenuItem>
                                <MenuItem value="Offline">Offline</MenuItem>
                            </Select>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={''} autoFocus>
                        Disagree
                    </Button>
                    <Button onClick={() => addUser()}>Add</Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={eopen}
                onClose={''}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog">
                <DialogTitle id="alert-dialog-title">
                    {"Edit User Detaol"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ width: 320 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" >
                            <Avatar src={eimage} />
                            <Box>

                                <Typography>{ename}</Typography>
                                <Typography>{estatus}</Typography>
                            </Box>
                        </Stack>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                                Full Name
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Jane Doe"
                                size="small"
                                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#F9FAFB' } }}
                                value={ename}
                                onChange={(e) => setEname(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                                Age
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Jane Doe"
                                size="small"
                                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#F9FAFB' } }}
                                value={eage}
                                onChange={(e) => setEage(e.target.value)}

                            />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
                                Status
                            </Typography>
                            <Select
                                fullWidth
                                size="small"
                                defaultValue="Online"
                                sx={{ bgcolor: '#F9FAFB' }}
                                value={estatus == "Online" ? 'Online' : "Offline"}
                                onChange={(e) => setEstatus(e.target.value)}

                            >
                                <MenuItem value="Online">Online</MenuItem>
                                <MenuItem value="Offline">Offline</MenuItem>
                            </Select>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={''} autoFocus>
                        Disagree
                    </Button>
                    <Button onClick={() => edUser()}>Edit</Button>
                </DialogActions>
            </Dialog>

            <Menu
                anchorEl={fix}
                open={openDrop}
                onClose={handleMoreClose}
                // Чтобы меню открывалось чуть ниже кнопки, как на макете
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => editUser(active)}>
                    <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => deleteUser(active.id)} sx={{ color: 'error.main' }}>
                    <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    )
}
