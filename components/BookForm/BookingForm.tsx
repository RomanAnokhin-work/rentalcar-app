import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"
import css from "./BookingForm.module.css";

const BookingSchema = Yup.object().shape({
  name: Yup.string().required("Ім'я обов'язкове"),
  email: Yup.string().email('Невірний email').required('Email обов\'язковий'),
  bookingDate: Yup.date(),
  comment: Yup.string()
});

export default function BookingForm(){
   return (
    <div className={css.container}>
      <div>
        <h3 className={css.title}>Book your car now</h3>
        <p className={css.text}>Stay connected! We are always ready to help you.</p>
      </div>

    <Formik
      initialValues={{ name: '', email: '', bookingDate: '', comment: '' }}
      validationSchema={BookingSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form}>
          <div className={css.form_row}>
            <div className={css.form_name}>
              
              <Field type="text" name="name" placeholder="Name*" className={css.input_name} />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            
            <div className="form-group">

              <Field type="email" name="email" placeholder="Email*" className={css.input_name} />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              
              <Field type="date" name="bookingDate" placeholder="Booking date" className={css.input_name} />
            </div>
            
            <div className="form-group">

              <Field as="textarea" name="comment" placeholder="Comment" className={css.input_comment} />
            </div>
          </div>
          
          <button type="submit" disabled={isSubmitting} className={css.submit_button}>
            Send
          </button>
        </Form>
      )}
    </Formik>
    </div>
    
  );
}