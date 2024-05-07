import React from 'react';
import styles from './DirectionStepper.module.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

const DirectionStepper = () => {
  return (
    <Box className={styles.DirectionStepper} sx={{height: '100%'}}>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper active={true} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} expanded={true}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent sx={{height: 'auto'}}>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

export default DirectionStepper;
