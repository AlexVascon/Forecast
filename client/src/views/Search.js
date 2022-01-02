import React, { useState, useContext } from 'react'
import { View } from '../components/View'
import styled from 'styled-components'
import arrowDownIconImage from '../assets/arrow-down.png'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import backgroundImage from '../assets/background-image.jpg'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import close from '../assets/close.png'
import geoLocationIcon from '../assets/geo-location.png'
import { WeatherContext } from '../weatherContext'
import CircularProgress from '@mui/material/CircularProgress'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function Search() {
  const {
    fetchWeather,
    setSearch,
    setGeolocation,
    setIsGeolocation,
    isLoading,
    setIsLoading,
  } = useContext(WeatherContext)

  const [open, setOpen] = useState(false)
  const handleOpenSearchForm = () => setOpen(true)
  const handleCloseSearchScreen = () => setOpen(false)
  const handleSearchChange = (e) => setSearch(e.target.value)

  const submitRequestToAPI = async (e) => {
    setIsLoading(true)
    if (e.target.name === 'geolocation')
      return navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation(position)
        setIsGeolocation(true)
        setOpen(false)
      })
    setGeolocation(false)
    fetchWeather()
    setOpen(false)
  }

  return (
    <View>
      <ArrowDownIcon />
      <OpenSearchFormButton onClick={handleOpenSearchForm} />
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <CloseBar>
          <CloseBarOption>
            <CloseButton onClick={handleCloseSearchScreen} />
          </CloseBarOption>
        </CloseBar>
        <SearchContainer>
          {isLoading && <CircularProgress />}
          <Text>Geolocation</Text>
          <GeoLocationSearchButton
            name='geolocation'
            onClick={submitRequestToAPI}
          />
          <SearchForm>
            <FormGroup>
              <Input
                type='text'
                placeholder='Or type city name'
                onChange={handleSearchChange}
              />
              <SubmitSearch
                fontSize='large'
                name='search'
                onClick={submitRequestToAPI}
              />
            </FormGroup>
          </SearchForm>
        </SearchContainer>
      </Dialog>
    </View>
  )
}

const ArrowDownIcon = styled.span`
  background-image: url(${arrowDownIconImage});
  background-size: contain;
  opacity: 0.4;
  width: 2rem;
  height: 2rem;
`
const OpenSearchFormButton = styled.button`
  margin-top: 0.5rem;
  border-radius: 50%;
  background-color: white;
  width: 3.5rem;
  height: 3.5rem;
  border: 8px solid RGB(66, 48, 79);
  outline: 1px solid white;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 20px 5px rgba(255, 255, 255, 0.5);
  }
`
const CloseBar = styled(AppBar)`
  background-color: rgba(51, 38, 63, 0.9);
`
const CloseBarOption = styled(Toolbar)`
  background-color: rgba(29, 18, 42, 0.94);
`
const CloseButton = styled.button`
  width: 2rem;
  height: 2rem;
  background-image: url(${close});
  background-size: contain;
  color: white;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`
const SearchContainer = styled.div`
  flex: 1;
  background-image: url(${backgroundImage});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Text = styled.h2`
  color: white;
  margin-bottom: 0.5rem;
  font-family: 'Roboto Mono', monospace;
`
const GeoLocationSearchButton = styled.button`
  background-color: transparent;
  width: 3rem;
  heigth: 3rem;
  border: none;
  padding: 2rem;
  background-image: url(${geoLocationIcon});
  background-size: contain;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  margin-bottom: 2rem;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 20px 5px rgba(255, 255, 255, 0.5);
  }
`
const SearchForm = styled.form`
  width: 80%;
`
const FormGroup = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  background-color: transparent;
  border-radius: 0.5rem;
  padding: 0;
`
const Input = styled.input`
  border: none;
  width: 85%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(158, 131, 184, 0.23);
  color: white;
  &::placeholder {
    color: white;
    font-family: 'Roboto Mono', monospace;
  }
  &:focus {
    outline: 1px solid white;
  }
`
const SubmitSearch = styled(FingerprintIcon)`
  color: white;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 20px 5px rgba(255, 255, 255, 0.5);
  }
`
