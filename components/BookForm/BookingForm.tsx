import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"

const BookingSchema = Yup.object().shape({
  name: Yup.string().required("Ім'я обов'язкове"),
  email: Yup.string().email('Невірний email').required('Email обов\'язковий'),
  bookingDate: Yup.date(),
  comment: Yup.string()
});

export default function BookingForm(){
   return (
    <Formik
      initialValues={{ name: '', email: '', bookingDate: '', comment: '' }}
      validationSchema={BookingSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <div className="form-row">
            <div className="form-group">
              <label>Name*</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            
            <div className="form-group">
              <label>Email*</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Booking date</label>
              <Field type="date" name="bookingDate" />
            </div>
            
            <div className="form-group">
              <label>Comment</label>
              <Field as="textarea" name="comment" />
            </div>
          </div>
          
          <button type="submit" disabled={isSubmitting}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
}