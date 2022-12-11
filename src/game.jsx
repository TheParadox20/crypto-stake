import {useState,useEffect} from 'react'
import { ethers } from "ethers";
import {CryptoStakeContract,CryptoStakeContractSigner,provider} from './contracts'
import './game.css'

let placeBet = async (gameID,choice,stake,e)=>{
    console.log(gameID,stake,choice);
    e.preventDefault();
    await provider.send("eth_requestAccounts", []);
    
    let tx = {
      // gasLimit:300000,
      value:ethers.utils.parseEther((stake))
    }
    await CryptoStakeContractSigner.placeBet(gameID,parseInt(choice),tx);
}

let amount = '';
function Game(props){
    let [homeStake, setHomeStake] = useState(0.0);
    let [awayStake, setAwayStake] = useState(0.0);
    let [drawStake, setDrawStake] = useState(0.0);
    let [possibleWin, setPossibleWin] = useState(0.0);
    let [currency, setCurrency] = useState('ETH');
    let [choice, setChoice] = useState(1);
    useEffect(()=> {
        async function updateBalance(){
            let balance = await CryptoStakeContract.getStakes(props.gameID);
            // setHomeStake((parseFloat(ethers.utils.formatEther(parseInt(balance.home._hex,16)))/props.convertionRate).toFixed(8));
            setHomeStake(parseFloat(ethers.utils.formatEther(parseInt(balance.home._hex,16))));
            setAwayStake(parseFloat(ethers.utils.formatEther(parseInt(balance.away._hex,16))));
            setDrawStake(parseFloat(ethers.utils.formatEther(parseInt(balance.draw._hex,16))));
        }
        setInterval(updateBalance, 10000);
    },[])

    let handleAmount = event =>{
        amount = event.target.value;
        let stake = parseFloat(amount);
        let winnings=0;
        let pot=0;
        switch (choice) {
            case 1://home
                winnings = awayStake+drawStake;
                pot=homeStake;
                break;
            case 0://draw
                winnings = awayStake+homeStake;
                pot=drawStake
                break;
            case 2://away
                winnings = homeStake+drawStake;
                pot=awayStake
                break;
        }
        setPossibleWin(isNaN(stake/(pot+stake)*winnings)?0:(stake/(pot+stake)*winnings));
    };
    return (
        <div className='game'>
            <p><img src="./test.png" alt="" srcSet="" /> {props.home}</p>
            <p>VS</p>
            <p><img src="./test.png" alt="" srcSet="" /> {props.away}</p>
            {props.time}
            <table>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>X</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td><button id={choice==1?'active':''} onClick={(e)=>setChoice(1)}>{homeStake}</button></td>
                        <td><button id={choice==0?'active':''} onClick={(e)=> setChoice(0)}>{drawStake}</button></td>
                        <td><button id={choice==2?'active':''} onClick={(e)=> setChoice(2)}>{awayStake}</button></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <input type="text" placeholder={'Your Stake('+currency+')'} onKeyUp={handleAmount} />
                <p>Possible Win: {possibleWin} {currency}</p>
                <button onClick={(e)=>placeBet(props.gameID,choice,amount,e)}>Place Bet</button>
                <button>Cart</button>
            </div>
        </div>
    )
}

export default Game;