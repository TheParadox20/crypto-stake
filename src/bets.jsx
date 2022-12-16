function Bets(){//list active bets for user
    return(
        <>
            <h1>Your Bets</h1>
            <table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Kickoff</th>
                        <th>Stake</th>
                        <th>Possible Win</th>
                        <th>Equivalent odd</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </>
    )
}
export default Bets;