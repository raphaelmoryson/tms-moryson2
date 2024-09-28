import React from 'react'
import Area from '../Area'
import { FaPrint } from "react-icons/fa";

function Dashboard() {
  let button = [
    {
      buttonName: "add",
      color: "green",
      action: null,
      content: "+"
    },
    {
      buttonName: "delete",
      color: "red",
      action: null,
      content: "x"
    },
    {
      buttonName: "print",
      color: "cyan",
      action: null,
      content: <FaPrint />
    },
  ]
  return (
    <Area name={"Accueil"} button={button}>

    </Area>
  )
}

export default Dashboard