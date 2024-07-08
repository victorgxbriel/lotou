import { resolve } from 'path'
import {promises as fs } from 'fs'
import loteriaJSON from "../public/assets/loterias.json"

export default function (){
    const loterias: Loteria[] = JSON.parse(JSON.stringify(loteriaJSON))
    return loterias
}