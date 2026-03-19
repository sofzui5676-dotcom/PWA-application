let leaderboard = [
    {id:1, name:"Алексей", points:2450},
    {id:2, name:"Мария", points:2100},
    {id:3, name:"Дмитрий", points:1890},
    {id:4, name:"Елена", points:1650},
    {id:5, name:"Сергей", points:1200}
];

export function getLeaderboard() { 
    return [...leaderboard].sort((a,b) => b.points - a.points); 
}
