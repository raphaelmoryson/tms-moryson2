import React from 'react'
import Area from '../Area'
import { FaPrint } from "react-icons/fa";
import CardDashboard from './CardDashboard';

function Dashboard() {
  let button = [
    {
      buttonName: "print",
      color: "cyan",
      action: null,
      content: <FaPrint />
    },
  ]

  return (
    <Area name={"Tableau de bord"} button={button}>
      <CardDashboard />
    </Area>
  )
}

export default Dashboard