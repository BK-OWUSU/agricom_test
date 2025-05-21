import PropTypes from "prop-types";
import { Button } from "flowbite-react"

export function PrimaryButtons({btnIcon, className, text, type, onClick, disabled = false}) {
  return (
     <Button className= {className} disabled = {disabled} type={type} onClick={onClick} gradientMonochrome="success"> {btnIcon} <span className="hidden md:block">{text}</span></Button>
  )
}

export function PrimaryButtonsMd({btnIcon, className, text, type, onClick, disabled = false}) {
  return (
     <Button className= {className} disabled = {disabled} type={type} onClick={onClick} gradientMonochrome="success"> {btnIcon} {text}</Button>
  )
}
export function PrimaryButtonsOutline({btnIcon, className, text, type, onClick, disabled = false}) {
  return (
     <Button className= {className} disabled = {disabled} type={type} onClick={onClick} gradientMonochrome="success" outline> {btnIcon} {text}</Button>
  )
}

export function DangerButtons({btnIcon, className, text, type, onClick, disabled = false}) {
  return (
     <Button className= {className} disabled = {disabled} type= {type} onClick={onClick} gradientMonochrome="failure"> {btnIcon} <span className="hidden md:block">{text}</span></Button>
  )
}

export function DangerButtonsMd({btnIcon, className, text, type, onClick, disabled = false}) {
  return (
     <Button className= {className} disabled = {disabled} type= {type} onClick={onClick} gradientMonochrome="failure"> {btnIcon} {text}</Button>
  )
}

//SETTING THE PROPERTIES DATA TYPES
PrimaryButtons.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

PrimaryButtonsMd.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

PrimaryButtonsOutline.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

DangerButtons.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

DangerButtonsMd.propTypes = {
    btnIcon: PropTypes.element,
    text: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string
};