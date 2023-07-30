import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MultiDaySelect from "./MultiDaySelect";
import MultiMealSelect from "./MultiMealSelect";
import RoundedTextField from "./RoundedTextField";
import MultiDayMealSelect from "./MultiDayMealSelect";
import VeganToggle from "./VeganToggle";
import SuggestionButtons from "./SuggestionButtons";
import api from "../api.js";
import { LinearProgress } from "@mui/material";

const steps = [
  "Selct days and meals you want to plan",
  "Choose your food preferences",
  "When do you want to plan takeout/leftover",
];

export default function HomeStepper({ handleResposeFetched }) {
  const [veganStatus, setVeganStatus] = useState();
  const [days, setDays] = useState([]);
  const [meals, setMeals] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const [preferredInput, setPreferredInput] = useState("");
  const [proteinInput, setProteinInput] = useState("");
  const [fruitsInput, setFruitsInput] = useState("");
  const [vegetablesInput, setVegetablesInput] = useState("");
  const [starchInput, setStarchInput] = useState("");
  const [dairyInput, setDairyInput] = useState("");

  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [avoidInput, setAvoidInput] = useState("");
  const [allergicInput, setAllergicInput] = useState("");

  const [leftover, setLeftover] = useState({});
  const [takeout, setTakeout] = useState({});
  // const [response, setResponse] = useState({});

  const handleVeganChange = (status) => {
    setVeganStatus(status);
    // console.log("Vegan Status: " + status);
  };
  const handleDaysChange = (incoming_days) => {
    setDays(incoming_days);
    // console.log("Days : " + incoming_days);
  };
  const handleMealsChange = (incoming_meals) => {
    setMeals(incoming_meals);
    // console.log("Meals : " + incoming_meals);
  };

  const handleLeftoverTakeoutChange = (id, value) => {
    // let temp_lft = {};
    // for (let key in value) {
    //   temp_lft[key] = value[key];
    // }
    if (id === "leftover_days") {
      setLeftover(value);
    } else if (id === "takeout_days") {
      setTakeout(value);
    }
    // console.log(id, value);
    // console.log(temp_lft);
    // console.log(id, leftover);
    // console.log(id, takeout);
  };

  const handleFoodGenreChange = (value, type) => {
    // console.log(type + " : " + value);
    if (type === "genre") {
      setGenreInput(value);
      // console.log(value.split(","));
    } else if (type === "preferredFoods") {
      setPreferredInput(value);
      // console.log(value.split(","));
    } else if (type === "protein") {
      setProteinInput(value);
    } else if (type === "fruits") {
      setFruitsInput(value);
    } else if (type === "vegetables") {
      setVegetablesInput(value);
    } else if (type === "starch") {
      setStarchInput(value);
    } else if (type === "dairy") {
      setDairyInput(value);
    } else if (type === "allergicFoods") {
      setAllergicInput(value);
    } else if (type === "avoidFoods") {
      setAvoidInput(value);
    }
  };
  const handleSuggestionButtonClick = (suggestionName, clickedNames) => {
    if (suggestionName === "suggestedGenres") {
      setSelectedGenre(clickedNames);
      setGenreInput(clickedNames);
    } else if (suggestionName === "suggestedMeals") {
      setSelectedMeals(clickedNames);
      setPreferredInput(clickedNames);
    }
    // console.log(suggestionName + " : " + clickedNames);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    // return step === 0;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // console.log("Is this submit clicked?");
      // Send POST request to backend
      const to_include_foods = meals + " meals for " + days + " days";
      const data = {
        meal_requirements: {
          to_include_foods: to_include_foods,
          veganCheck: veganStatus,
          // food_genre: genreInput,
          // preffered_foods: preferredInput,
          protein: proteinInput,
          fruits: fruitsInput,
          vegetables: vegetablesInput,
          starch: starchInput,
          dairy: dairyInput,
          avoid_foods: avoidInput,
          allergic_foods: allergicInput,
          leftover_days: leftover,
          takeout_days: takeout,
          treats: "",
        },
      };
      api
        .postData("/get_plan", data)
        .then((response) => {
          handleResposeFetched(response);

          console.log(response);
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }

    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {/* All steps completed - you&apos;re finished */}
            <LinearProgress />
            <div className="mt-4 text-center">
              Loading your curated diet plan!
            </div>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 && (
              <React.Fragment>
                {/* Display the MultiDaySelect and MultiMealSelect components */}
                <MultiDaySelect handleDaysChange={handleDaysChange} />
                <MultiMealSelect handleMealsChange={handleMealsChange} />
              </React.Fragment>
            )}
            {activeStep === 1 && (
              <React.Fragment>
                <div className="row mt-3 mb-3">
                  <VeganToggle handleVeganChange={handleVeganChange} />
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <h5 style={{ color: "rgb(25, 118, 210)" }}>
                      Preferred Foods
                    </h5>
                  </div>
                </div>

                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <RoundedTextField
                      name="protein"
                      fieldLabel="Protein: (beef, chicken, fish, beans, etc.) :"
                      id="protein"
                      value={proteinInput}
                      onChange={handleFoodGenreChange}
                    />
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <RoundedTextField
                      name="fruits"
                      fieldLabel="Fruits: (apples, bananas, strawberries, etc.) :"
                      id="fruits"
                      value={fruitsInput}
                      onChange={handleFoodGenreChange}
                    />
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <RoundedTextField
                      name="vegetables"
                      fieldLabel="Vegetables: (broccoli, green beans, salad, etc.) :"
                      id="vegetables"
                      value={vegetablesInput}
                      onChange={handleFoodGenreChange}
                    />
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <RoundedTextField
                      name="starch"
                      fieldLabel="Starch: (pasta, rice, potatoes, etc.) :"
                      id="starch"
                      value={starchInput}
                      onChange={handleFoodGenreChange}
                    />
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <RoundedTextField
                      name="dairy"
                      fieldLabel="Dairy: (milk, yogurt, cheese, etc.) :"
                      id="dairy"
                      value={dairyInput}
                      onChange={handleFoodGenreChange}
                    />
                  </div>
                </div>
                {/* 
                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <RoundedTextField
                      name="genre"
                      fieldLabel="Your food genre preferences: (Mexican, Italian, Chinese, etc.) :"
                      id="food_genre"
                      value={genreInput}
                      onChange={handleFoodGenreChange}
                    />
                  </div>
                  <div className="col-12">
                    <SuggestionButtons
                      suggestionName="suggestedGenres"
                      onButtonClick={handleSuggestionButtonClick}
                      values={[
                        "Italian",
                        "Mexican",
                        "Chinese",
                        "Japanese",
                        "Indian",
                        "Thai",
                        "French",
                        "Greek",
                        "Spanish",
                        "American",
                      ]}
                    />
                  </div>
                </div>

                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <RoundedTextField
                      name="preferredFoods"
                      fieldLabel="Preferred foods (Add atleast 5-10 foods) :"
                      id="preferred"
                      value={preferredInput}
                      onChange={handleFoodGenreChange}
                    />
                  </div>

                  <div className="col-12">
                    <SuggestionButtons
                      suggestionName="suggestedMeals"
                      onButtonClick={handleSuggestionButtonClick}
                      values={[
                        "Pizza",
                        "Pasta",
                        "Tiramisu",
                        "Tacos",
                        "Quesadillas",
                        "Burritos",
                        "Biryani",
                        "Dosa",
                        "Hot Dog",
                        "Hamburger",
                      ]}
                    />
                  </div>
                </div> */}
                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <h5 style={{ color: "rgb(25, 118, 210)" }}>
                      Foods to avoid
                    </h5>
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <RoundedTextField
                      name="avoidFoods"
                      fieldLabel="Foods to avoid :"
                      id="avoid_foods"
                      value={avoidInput}
                      onChange={handleFoodGenreChange}
                    />
                  </div>
                </div>

                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <h5 style={{ color: "rgb(25, 118, 210)" }}>
                      Allergic Foods
                    </h5>
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <RoundedTextField
                      name="allergicFoods"
                      fieldLabel="Allergic foods:"
                      id="allergic_foods"
                      value={allergicInput}
                      onChange={handleFoodGenreChange}
                    />
                  </div>
                </div>
              </React.Fragment>
            )}
            {activeStep === 2 && (
              <React.Fragment>
                <div className="row mt-3 mb-3">
                  <MultiDayMealSelect
                    handleLeftoverTakeoutChange={handleLeftoverTakeoutChange}
                    id="leftover_days"
                    label="Select Leftover Days"
                  />
                </div>
                <div className="row mt-3 mb-3">
                  <MultiDayMealSelect
                    handleLeftoverTakeoutChange={handleLeftoverTakeoutChange}
                    id="takeout_days"
                    label="Select Takeout Days"
                  />
                </div>
              </React.Fragment>
            )}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>

            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
