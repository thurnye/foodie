import React, {useState, useEffect, useMemo} from 'react';
import styles from './EventDetails.module.css';
import { useForm, Controller } from "react-hook-form";
import CompTextEditor from '../../../../CompTextEditor/CompTextEditor';
import Dropzone from 'react-dropzone'
import {LiaCameraRetroSolid} from 'react-icons/lia';
import {MdOutlineCancel} from 'react-icons/md';
import { convertToBase64 } from '../../../../../util/commons';
import { useAddEventFormContext } from '../../../../../store/formStateContext';
import FormDirection from '../FormDirection/FormDirection'

const EventDetails = () => {
  const { eventForm, setEventForm } = useAddEventFormContext()
  const {
    control,
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    defaultValues: useMemo(() => {
      return eventForm.eventDetails;
    }, [eventForm.eventDetails])
  });

  useEffect(() => {
    reset(eventForm.eventDetails);
  }, [eventForm.eventDetails]);

  const [quesAndAns, setQuesAndAns] = useState({
    fAQs: [{
      ques: "", 
      ans: ""}]
  });


  const [proceed, setProceed] = useState(false);

  const onSubmit = async (data) => {
    try{
      setEventForm((eventForm) => ({ ...eventForm, eventDetails: data }));
      setProceed(true)
    }catch(err){
      console.log(err)
    }
  };

  const handleChange = (e, index) => {
    const items = quesAndAns.fAQs;
    items[index][e.target.name]= e.target.value
    setQuesAndAns({
      fAQs: items
    });
  };

  useEffect(() => {
    const { fAQs } = quesAndAns; 
    setValue('fAQs', fAQs);
  },[quesAndAns, setValue]);



  const handleDelete = (index) => {
    const items = quesAndAns.fAQs;
    if (items.length > 1) {
      items.splice(index, 1);
      setQuesAndAns({
        fAQs: items
      });
    } 
  };


  const addNewRow = () => {
    const items = quesAndAns.fAQs;
    const blankRow = { ques: "", ans: ""};
    setQuesAndAns({
      fAQs: [...items, blankRow]
    });
  };



  return(
  <div className={styles.EventDetails}>
    {/* Section 1: Event Details */}
    <div>
      <div className={styles.sectionHeader}>
        <p className={`h1 ${styles.sectionNumber}`}>1</p>
        <p className={`h2 ${styles.sectionName}`}>Event Details</p>
      </div>

      <div className={styles.sectionForm}>
        <form>
          <div className="form">
            {/* Event Title */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput_4" className="form-label">Event Title</label>
              <Controller
                name="eventTitle"
                control={control}
                autoFocus
                rules={{
                  required: "required"
                }}
                render={({ field }) => (
                  <input
                    autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Give it a short distinct name"
                    {...field}
                  />
                )}
              />
            </div>

            {/* Event Location */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput_7861" className="form-label">Location</label>
              <Controller
                name="location"
                control={control}
                rules={{
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Location should contain only letters",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Specify where it's held"
                    {...field}
                  />
                )}
              />
              <div className="form-check">
                <Controller
                  name="isOnline"
                  control={control}
                  defaultValue={false} 
                  render={({ field }) => (
                    <>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckIndeterminate"
                        {...field}
                      />
                      <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                        Online Event
                      </label>
                    </>
                  )}
                />
                <label className="form-check-label" htmlFor="flexCheckIndeterminate_8979">
                  Online Event
                </label>
              </div>
            </div>

            {/* Event Time  */}
            <div className={`mb-3 row ${styles.eventTime}`}>
              <div className="col-md-6">
                <label htmlFor="inputEmail_6764" className="form-label"
                >STARTS</label>
                <div className="container">
                  <div className="row gap-3">
                    <Controller
                      name="start.date"
                      control={control}
                      rules={{
                        required: "Event Start date is required"
                      }}
                      render={({ field }) => (
                        <input
                          type="date" 
                          className="form-control"
                          id="eventStartDate"
                          {...field}
                          placeholder="dd/mm/yyyy"
                        />
                      )}
                    />

                    <Controller
                      name="start.time"
                      control={control}
                      rules={{
                        required: "Event Start time is required"
                      }}
                      render={({ field }) => (
                        <input
                          type="time" 
                          className="form-control"
                          id="eventStartTime"
                          {...field}
                          placeholder="hh:mm"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="inputEmail_6764" className="form-label"
                >ENDS</label>
                <div className="container">
                  <div className="row gap-3">
                    <Controller
                      name="ends.date"
                      control={control}
                      rules={{
                        required: "Event End date is required"
                      }}
                      render={({ field }) => (
                        <input
                          type="date" 
                          className="form-control"
                          id="eventEndDate"
                          {...field}
                          placeholder="dd/mm/yyyy"
                        />
                      )}
                    />

                    <Controller
                      name="ends.time"
                      control={control}
                      rules={{
                        required: "Event End time is required"
                      }}
                      render={({ field }) => (
                        <input
                          type="time" 
                          className="form-control"
                          id="eventEndTime"
                          {...field}
                          placeholder="hh:mm"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <Controller
                name="repeat"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <div>
                    <div className={` mb-3 ${styles.repeatEvent}`}>
                      <input 
                      className="form-check-input" 
                      type="checkbox" 
                      value="" 
                      id="flexCheckIndeterminate"
                      {...register("repeat")}
                      {...field}
                      />
                      <label className="form-check-label" htmlFor="flexCheckIndeterminate_8979">
                        Repeat Event
                      </label>
                    </div>
                  {field.value ? <div>
                    <label htmlFor="inputEmail_6764" className="form-label">Frequency</label>
                    <select className="form-select" aria-label="Default select example" {...register("frequency")}>
                      <option value="weekly" selected>Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div> : null}
                  </div>
                )}
              />
            </div>
            
            {/* Event Image */}
            <div className={`mb-3`}>
              <label htmlFor="eventImage_6764" className="form-label">Event Image</label>
              <Controller
                name="thumbnail"
                control={control}
                render={({ field }) => (
                  <>
                    <Dropzone
                      multiple={false}
                      onDrop={async (acceptedFiles) => {
                        // Handle file upload and set the thumbnail value
                        field.onChange(await convertToBase64(acceptedFiles[0]));
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.dropZoneContainer}>
                          <input {...getInputProps()} />
                          {!field.value ? (
                            <div className="card">
                              <div className={`card-body ${styles.DropZoneCard}`}>
                                <p className={`h1 ${styles.dropZoneIcon}`}>
                                  <LiaCameraRetroSolid />
                                </p>
                                <p className="h3">ADD AN EVENT IMAGE</p>
                                <h6 className="card-subtitle mb-2 text-body-secondary small">
                                  Choose a beautiful image that perfectly captures your event.
                                </h6>
                              </div>
                            </div>
                          ) : (
                            <div className="card">
                              <div className={`card-body ${styles.DropZoneCard}`}>
                                <img src={field.value} className="card-img" alt="event_banner" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  </>
                )}
              />
            </div>
            
            {/* Event description */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea_456" className="form-label">Event Description</label>
              <Controller
                name="eventDescription"
                control={control}
                render={({ field }) => (
                  <CompTextEditor
                    setEditorData={(htmlValue) => field.onChange(htmlValue)}
                    show={false}
                    placeholder="Tell people what's special about this event"
                    value={field.value}
                  />
                )}
              />
              <Controller
                name="addFAQs"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <div>
                    <div className="form-check mb-2">
                      <input 
                        className="form-check-input " 
                        type="checkbox" 
                        value="true" 
                        id="flexCheckDefault_989"
                        {...field}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Add FAQs
                      </label>
                    </div>
                    {field.value ? <div>
                      <>
                        <p className="h3">FAQs</p>
                        {quesAndAns.fAQs.map((item, index) => (
                          <div key={index}>
                              <div className="step-del mb-0">
                                <h6>No. {index + 1}</h6>           
                                {quesAndAns.fAQs.length > 1 &&
                                  <MdOutlineCancel 
                                    strokeWidth="1" 
                                    size="25"
                                    color="salmon"
                                    onClick={() => handleDelete(index)}
                                  />
                                }
                              </div>
                              <div className='container'>
                                <div className={`mb-3 row ${styles.eventTime}`}>
                                  <div className="col-md-6">
                                    <label htmlFor="inputEmail_6764" className="form-label">Question</label>
                                    <textarea 
                                      className="form-control method-steps" 
                                      id="exampleFormControlFAQsQues" 
                                      rows="2"
                                      name="ques"
                                      placeholder='Tell people what are your refund policies, dress code, key timings etc.'
                                      value={item.ques}
                                      onChange={(e) => handleChange(e, index)}
                                    ></textarea>
                                  </div>

                                  <div className="col-md-6">
                                    <label htmlFor="inputEmail_6764" className="form-label">Answer</label>
                                    <textarea 
                                      className="form-control method-steps" 
                                      id="exampleFormControlFAQsAns" 
                                      rows="2"
                                      name="ans"
                                      value={item.ans}
                                      onChange={(e) => handleChange(e, index)}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                          </div>
                        ))}
                        <div className="row">
                            <div className="col col-md-10 text-right">
                                {/* <input type="button" value="+Add New" onClick={addNewRow} className="btn btn-secondary"/> */}
                                <button type="button" className="btn btn-link" onClick={addNewRow}>Add New</button>
                            </div>
                        </div>
                      </>
                    </div> 
                    
                    : null}
                  </div>
                )}
              />
            </div>
            
            {/* Event Organiser */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput_4" className="form-label">Organiser Name</label>
              <Controller
                name="organiserName"
                control={control}
                rules={{
                  required: "Name of organiser is required",
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Who's organising this event?"
                    {...field}
                  />
                )}
              />
            </div>

            {/* Event Organiser Description */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea_426" className="form-label">ORGANISER DESCRIPTION</label>
              <Controller
                name="organiserDescription"
                control={control}
                render={({ field }) => (
                  <CompTextEditor
                    setEditorData={(htmlValue) => field.onChange(htmlValue)}
                    show={false}
                    placeholder="Tell people what's special about this event"
                    value={field.value}
                  />
                )}
              />
            </div>

            {/* Event External Links */}
            <div className="mb-3 form-check">
              <Controller
                name="includeLinks"
                control={control}
                defaultValue={false} // Set the default value if needed
                render={({ field }) => (
                  <>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckIndeterminate"
                      {...field}
                    />
                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                      Include links to Social Media platforms
                    </label>
                  </>
                )}
              />
              <label className="form-check-label" htmlFor="flexCheckIndeterminate_8979">
                Include links to Social Media platforms
              </label>
            </div>

          </div> 
          <div>
              <FormDirection onSubmit={handleSubmit(onSubmit)} proceed={proceed}/>
          </div>    
        </form>
      </div>

    </div>
  </div>
)};


export default EventDetails;