import { Box, Button, Container, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  deleteData, getData, getcountry, getstate } from '../features/ListSlice'
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const style = {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    // border: '2px solid /#000',
    boxShadow: 24,
    p: 4,
};


const Home = () => {

    const { lists, states, formdata } = useSelector(state => state.list)


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {

        setOpen(true)
    };
    const handleClose = () => setOpen(false);



    const dispatch = useDispatch()
    const [text, setText] = useState({
        id: crypto.randomUUID(),
        name: "",
        email: "",
        number: "",
        country: "",
        state: "",

    })


    useEffect(() => {
        dispatch(getcountry())
        dispatch(getstate())

    }, [dispatch])
    const {  name, email, number, country, state } = text

    const handleChange = (e) => {
        setText({
            ...text,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getData(text))
        setText({
            name: "",
            email: "",
            number: "",
            country: "",
            state: "",

        })

    }

    const handleDelete = (id) => {
        //   console.log(id)
      dispatch(deleteData(id))
       
    }
    return (
        <>

            <Container sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px", flexDirection: "column" }}>
                <Typography variant='h4'>User Data</Typography>
                <Paper sx={{ width: "100%", padding: "20px" }}  >
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell ><b>Email</b></TableCell>
                                <TableCell ><b>Mobile Number</b></TableCell>
                                <TableCell ><b>Country</b></TableCell>
                                <TableCell ><b>State</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ marginTop: "10px" }}>

                            {
                                formdata.map(data => <TableRow key={data.id} data={data}  >
                                    <TableCell component="th" scope="row">{data.name}</TableCell>
                                    <TableCell >{data.email}</TableCell>
                                    <TableCell >{data.number}</TableCell>
                                    <TableCell >{data.country}</TableCell>
                                    <TableCell >{data.state}</TableCell>
                                    <TableCell onClick={handleOpen}><EditIcon sx={{ color: "green" }} /></TableCell>
                                    <TableCell onClick={()=>handleDelete(data.id)}><DeleteIcon sx={{ color: "red" }} /></TableCell>
                                </TableRow>)
                            }


                        </TableBody>


                    </Table>

                </Paper>

            </Container>

            <button className='add-btn' onClick={handleOpen}><h1>+</h1></button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form method='post' onSubmit={handleSubmit} >
                        <TextField
                            type="text"
                            name="name"
                            placeholder='name'
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            type="email"
                            name="email"
                            placeholder='email'
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            type="number"
                            name="number"
                            placeholder='number'
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={number}
                            onChange={handleChange}
                            required
                        />
                        <InputLabel id="demo-simple-select-label">country</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                            name="country"
                            label="country"
                            fullWidth

                            onChange={handleChange}
                            value={country}
                            required
                        >

                            {
                                lists.list.map(item => <MenuItem key={item.id} item={item} value={item.name}>{item.name}</MenuItem>)
                            }


                        </Select>
                        <InputLabel id="demo-simple-seleyct-label">state</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            name="state"

                            fullWidth
                            label="state"
                            onChange={handleChange}
                            value={state}
                            required
                        >
                            {
                                states.list.map(item => <MenuItem key={item.id} item={item} value={item.name} >{item.name}</MenuItem>)
                            }

                        </Select>


                        <Button
                            
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            size="large"
                            method="post"
                            style={{ marginTop: '1rem' }}
                        >
                            Addlist
                        </Button>
                    </form>
                </Box>

            </Modal>
        </>



    )
}

export default Home
