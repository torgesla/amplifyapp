import { useState, useEffect } from 'react';

const inRange = (num : number, start : number, end : number) : boolean => {
    return num >= start && num < end;
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}
const emailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const capitalize = (str : string) : string => str.charAt(0).toUpperCase() + str.slice(1);
const zip = (a : string[], b : string[]) : string[][] => a.map((k, i) => [k, b[i]]);

export {zip, capitalize, inRange, emailRegex, useWindowDimensions}
