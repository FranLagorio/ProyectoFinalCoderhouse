import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Alert, Button, Card, Grid, Link, Typography } from '@mui/material'

import Swal from 'sweetalert2'
import { Oval } from 'react-loader-spinner'

import { AuthLayout } from '../layouts/AuthLayout'
import { registerUser } from '../../../api/backCoderAPI'

// Formik validation
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CardBody, Form, FormFeedback, Input, Label } from 'reactstrap'
import { InputYupForm } from '../../../components/InputYupForm'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export const RegisterPage = () => {
  const [alert, setAlert] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      navigate('/home')
    }

    if (success) {
      Swal.fire({
        title: 'Registro exitoso',
        text: '¡Se ha registrado con éxito! Haz clic en el botón de abajo para iniciar sesión',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cerrar',
      }).then((result) => {
        if (result.value) {
          // Redirigir al usuario a la página de inicio de sesión
          navigate('/login')
        }
      })
    }
  }, [success, navigate])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert('')
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [alert])

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
      name: '',
      age: null,
      adress: '',
      phone: '',
      image: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter a valid email')
        .required('Please enter your email'),
      password: Yup.string().required('Please enter your password'),
      name: Yup.string().required('Please enter your name'),
      age: Yup.number().required('Please enter your age').nullable(),
      adress: Yup.string().required('Please enter your adress'),
      phone: Yup.string().required('Please enter your phone'),
    }),
    onSubmit: (values) => {
      const user = {
        username: values.email,
        password: values.password,
        name: values.name,
        age: values.age,
        address: values.adress,
        phone: values.phone,
      }
      console.log(user)
      setLoading(true)
      registerUser(user, setSuccess, setAlert, setLoading)
    },
  })

  return (
    <AuthLayout
      bgColorPick={
        'linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(121,9,103,1) 47%, rgba(0,212,255,1) 100%)'
      }>
      <Grid item md={6} lg={4} xl={4}>
        {loading ? (
          <Card
            style={{
              borderRadius: 5,
              height: '720px',
              display: 'grid',
              placeContent: 'center',
            }}>
            <Oval
              height={80}
              width={80}
              color="#790967"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#790967"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </Card>
        ) : (
          <Card style={{ borderRadius: 5, fontFamily: 'poppins' }}>
            <Typography
              variant="h5"
              textAlign={'center'}
              style={{ margin: '1.5rem', marginTop: '3rem' }}>
              REGISTRO DE USUARIO
            </Typography>

            <CardBody style={{ margin: '1rem' }}>
              <div className="p-2">
                <Form
                  className="form-horizontal"
                  onSubmit={(e) => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}>
                  {/* {error ? <Alert color="danger">{error}</Alert> : null} */}

                  <InputYupForm
                    inputName={'email'}
                    typeInput={'email'}
                    validation={validation}
                  />
                  <InputYupForm
                    inputName={'password'}
                    typeInput={'password'}
                    validation={validation}
                  />
                  <InputYupForm
                    inputName={'name'}
                    typeInput={'string'}
                    validation={validation}
                  />
                  <InputYupForm
                    inputName={'age'}
                    typeInput={'number'}
                    validation={validation}
                  />
                  <InputYupForm
                    inputName={'adress'}
                    typeInput={'string'}
                    validation={validation}
                  />
                  {/* <InputYupForm
                    inputName={"phone"}
                    typeInput={"string"}
                    validation={validation}
                  /> */}
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      style={{ textTransform: 'capitalize' }}>
                      Phone
                    </Label>
                    <Input
                      style={{ display: 'none' }}
                      name={'phone'}
                      type={'string'}
                      value={validation.values.phone || ''}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.touched.phone && validation.errors.phone
                      }
                    />
                    <PhoneInput
                      country={'ar'}
                      preferredCountries={['ar', 'uy']}
                      inputStyle={{ width: '100%' }}
                      onChange={(phone) => (validation.values.phone = phone)}
                      // value={validation.values.phone || ""}
                      // inputProps={{
                      //   name: "phone",
                      //   type: "string",
                      // }}
                    />
                    {validation.touched.phone && validation.errors.phone ? (
                      <FormFeedback type="invalid">
                        {validation.errors.phone}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mt-3">
                    {alert ? <Alert severity="error">{alert}</Alert> : ''}
                  </div>
                  <div className="mt-4 text-center -50">
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{ width: '50%' }}>
                      Sign up
                    </Button>
                  </div>

                  <div className="mt-3 d-flex flex-column align-items-center">
                    <div className="mt-2">
                      Go back to{' '}
                      <Link
                        component={RouterLink}
                        to="/login"
                        sx={{ textDecoration: 'none' }}>
                        Login
                      </Link>
                    </div>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Grid>
    </AuthLayout>
  )
}
