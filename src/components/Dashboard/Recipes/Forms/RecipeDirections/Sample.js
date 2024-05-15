import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Button } from '@mui/material';
import { MdOutlineEdit } from "react-icons/md";
import Container from '@mui/material/Container'
import EastIcon from '@mui/icons-material/East';
import DirectionsForm from './DirectionsForm';
import DirectionStepper from '../../../../DirectionStepper/DirectionStepper';
import IngredientsAndDressingForm from './IngredientsAndDressingForm';
import IngredientsList from '../../../../IngredientsList/IngredientsList';



const Sample = ({setData, defaultValues}) => {
    const [isError, setIsError] = useState(false);
    const [methods, setMethods] = useState(defaultValues.methods)
    const [ingredients, setIngredients] = useState(defaultValues.ingredients)
    const [activeSection, setActiveSection] = useState("")
    const [isHovered, setIsHovered] = useState("");

    const getEditIcons = (section) => <Box sx={{ maxWidth: '100%', flexGrow: 1, position: 'relative' }}>
    <Box
        sx={{
        position: 'absolute',
        top: 6,
        right: 6,
        height: '100%',
        backgroundColor: '#E9EDFC',
        zIndex: 1,
        color: '#3559E3'
        }}
    >
        <Card sx={{ width: 25, height: 25, borderRadius: '50%', textAlign: 'center', background:'inherit' }} onClick={() => setActiveSection(section)}>
        <Typography>
            <MdOutlineEdit color='#3559E3'/>
        </Typography>
        </Card>
    </Box>
    </Box>

    const onSubmit = () => {
        
        const directions = {
            methods,
            ingredients
        }
        console.log(directions)
        setData(directions);
        // setIsError(false)
    };

    return (
        <Container>
            {/* methods */}
            <Box sx={{mb: 2}}>
                {activeSection !== 'methodsForm' &&
                <Box sx={{ }} onClick={() => methods?.length === 0 && setActiveSection('methodsForm')}>
                    <Card 
                        onMouseEnter={() => setIsHovered('methodsForm')}
                        onMouseLeave={() => setIsHovered("")}
                    >
                        {isHovered === 'methodsForm' && getEditIcons('methodsForm')}
                        <CardContent>
                            <Typography variant="h5" gutterBottom sx={{mb:3}}>
                               Preparation Methods and Steps
                            </Typography>
                            {isError &&<>
                                <Typography variant="caption" gutterBottom sx={{mb:3, color:'salmon'}}>
                                    {(methods.some(obj => obj.type !== 'text') || methods.length === 0 ) && '*recipe steps are required'}
                                </Typography>
                                </>
                            }
                            {methods?.length === 0 ? <>
                                <Typography variant="body2" gutterBottom>
                                    Use this section to provide more details preparation steps on your recipe. You can include things to add, customization tips, anything that will help people know what to expect.
                                </Typography>
                            </> 
                            : 
                                <DirectionStepper methods={methods}/>
                            }
                        </CardContent>
                    </Card>
                </Box>
                }
                {activeSection === 'methodsForm' && 
                    <Box sx={{}}>
                        <Card >
                            <CardContent>
                                <Typography variant="h5" gutterBottom sx={{mb:3}}>
                                    methods of this Recipe
                                </Typography>
                                <Box sx={{mb:3}}>
                                    <Typography variant="caption" color="text.secondary">
                                       <i>It's all bout the recipe here...</i>
                                    </Typography>

                                </Box>

                                <Box sx={{mb:2,  position: 'relative'}}>
                                    this will be the methods form
                                    <DirectionsForm 
                                        setData={setMethods} 
                                        directions={methods}
                                        open={true} 
                                        setOpen={setActiveSection}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                }
            </Box>

            {/* FAQ*/}
            <Box sx={{mb: 2}}>
                {activeSection !== 'faqForm' &&
                <Box sx={{ }} onClick={() => ingredients?.length === 0 && setActiveSection('faqForm')}>
                    <Card 
                        onMouseEnter={() => setIsHovered('faqForm')}
                        onMouseLeave={() => setIsHovered("")}
                    >
                        {isHovered === 'faqForm' && getEditIcons('faqForm')}
                        <CardContent>
                        {ingredients?.length === 0 ? <>
                            <Typography variant="h5" gutterBottom sx={{mb:3}}>
                                Ingredients And Dressings
                            </Typography>
                            
                            <Typography variant="body2" gutterBottom>
                                Add the main ingredients and Dressing Ingredients used to prepare your recipe
                            </Typography>

                                </> : <>
                                    <Typography variant="h5" gutterBottom sx={{mb:3}}>
                                        Frequently Asked Questions
                                    </Typography>
                                    <IngredientsList ingredients={ingredients}/>
                                </>
                        }
                            
                        </CardContent>
                    </Card>
                </Box>
                }
                {activeSection === 'faqForm' && 
                    <Box sx={{}}>
                        <Card >
                            <CardContent>
                                <Typography variant="h5" gutterBottom sx={{mb:3}}>
                                    FAQ
                                </Typography>
                                <Box sx={{mb:3}}>
                                    <Typography variant="caption" color="text.secondary">
                                        Answer questions your attendees may have methods the event, like parking, accessibility, refunds, and other informations.
                                    </Typography>
                                </Box>

                                <Box sx={{mb:2}}>
                                    {/* <ingredients 
                                        setIngredients={setIngredients} 
                                        ingredients={ingredients}
                                        setActiveSection={setActiveSection}
                                    /> */}
                                    <IngredientsAndDressingForm
                                        setData={setIngredients}
                                        ingredients={ingredients}
                                        open={true}
                                        setOpen={setActiveSection}
                                    />
                                    
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                }
            </Box>

            <Box sx={{mt: 10, width: '100%', textAlign: 'end'}}>
                <Button variant="text" endIcon={<EastIcon/>} onClick={()=>onSubmit()}>
                    Continue
                </Button>
            </Box>
        </Container>
    );
}

export default Sample;
