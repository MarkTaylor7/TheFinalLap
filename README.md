# 🏁 The Final Lap

Live website: https://marktaylor7.github.io/TheFinalLap/

<i>The Final Lap</i> is a tool that provides contextual race results for all Formula 1 drivers participating in the 2024 season. In F1, the performance of the car is the most important factor in achieving success. Each of the 10 teams is responsible for designing and developing its own car, and each car's performance potential varies according to track layout, tire wear, fuel level, and even environmental conditions like temperature, wind, and rain. Of course, the driver in the car also makes a difference.<br/>
        <br/>
![Screenshot of project desktop site](src/assets/images/desktopTitle.png)
<br/><br/>
        There are many resources online that show things like total wins, podiums, poles, fastest laps, points, etc. These are just counting numbers that do not indicate what is likely to happen at the next race. Instead, <i>The Final Lap</i> attempts to capture the full picture by highlighting three key variables:<br/>
        <ol><b>1. Recent Form: </b>The driver's last five race results, as a driver's car can get relatively faster or slower over a season as the teams introduce upgrade packages. These upgrades usually help, but sometimes do not gel with a driver's driving-style. This makes the driver's recent results valuable in predicting outcomes at the next race.  </ol>
        <ol><b>2. Circuit History: </b>The driver's last five results at the circuit. Each driver has his own driving-style and preferences for circuit layouts. Some driver's seem to find an extra gear at their home race, and some have "bogey tracks" where nothing seems to go right. </ol>
        <ol><b>3. Circuit Type: </b>The driver's last five results at that track-type. Some tracks feature long straights and high speeds that require peak engine performance and low drag aero set-ups. Others consist of constant turns and direction changes which reward cornering ability and grip (high-downforce). Many tracks place roughly equal demands on power and downforce. Some cars excel at a specific circuit-type, while others struggle.</ol>
        For greater context, each race result is measured against that driver's average race finish for that specific season. Exceptionally good performances appear dark green, exceptionally poor ones are a deep red. Additionally, each driver's name is colour-coded based on team, allowing for easy comparison of teammates. Full race reports are embedded in the table header, and the 2024 driver line-ups and race schedule are accessible via the menu.<br/><br/>
![Screenshot of project desktop site](src/assets/images/desktopTable.png)

# 💡 Motivation
I knew that learning React would be challenging and I would be dedicating a lot of time to this project, so I wanted to choose a topic that I am passionate about. I have been a F1 fan for most of my life - I haven't missed a race since the 2005 Hungarian Grand Prix (as of Feb 2024, that's 357 races ago). Every year, some friends and I take part in a "prediction pool", where before each race weekend we predict the top 10 finishing positions. Points are earned based how accurate our predictions are, and at the end of the season a champion is crowned. I would make my predictions based on my own knowledge of each car's strengths and weaknesses, the drivers historical results, and recent race results. <br/>

This information came from my own knowledge and 5 minutes of light "research", but I wanted to create a tool that would give me a convenient, yet comprehensive overview of these factors. I also wanted to gain experience with an API; learning how to manipulate large amounts of data and present it to a user in a useful way. I figured it would be easier to engage with this data if it was something I have an existing interest in.

Once I decided to move forward with this project idea, it was important to me that new or more casual F1 fans can benefit from this project as well. In the last few years the sport has exploded in popularity, and I'm having far more conversations about this passion of mine with people who have never sat down to watch a race.<br/>

Netflix's <i>Drive to Survive</i> does a phenomenal job of hooking new fans with its behind-the-scenes view of F1's characters, politics, and drama. If a new fan then decides to watch a race, all of that fades away and they are presented with a very complicated and technical sport that requires a ton of context to fully appreciate. My hope is that <i>The Final Lap</i> can make that experience more enjoyable, and F1 more accessible.

#  🏎️ Features
<li>Dynamic data table that provides up-to-date race data across three key metrics. A heat map enables the user to quickly distinguish exceptional performances from average ones.</li>
<li>Driver names are colour-coded with official team colours for easy comparison of teammates.
<li>Circuit Selector allows user to see data on any circuit featured on the 2024 schedule.</li>
<li>See a strange result and need more details? Links to full race reports are embedded in the table header. </li>
<li>"Next Race" widget tells you when and where the next event will happen.</li>   
<li>2024 driver line-ups and race schedules are accessible from the main menu.</li>
<li>Responsive design - the UI is optimized for both desktop and mobile viewports.</li><br/>

![Screenshot of project mobile site](src/assets/images/mobileTitle.png)
![Screenshot of project mobile site](src/assets/images/mobileTable.png)
<br/><br/>
![Screenshot of project desktop site](src/assets/images/desktopF1Grid.png)
<br/><br/>
![Screenshot of project desktop site](src/assets/images/desktopSchedule.png)

# 🧗 Challenges
<li>Learning to "think in React" was the biggest challenge to overcome. It was my first time using this technology and I had to master concepts like: state management, conditional rendering, component hierarchy, and hooks (useState, useEffect, useContext)</li>
<li>This was my first experience integrating a API into a project, and I spent a lot of time getting comfortable with API calls, JSON, error- handling (try...catch statements).</li>
<li>The project involves a significant amount of data manipulation (at least for me), and this forced me to keep my code organized, take care with naming variables, and think through my goals.</li>
<li>Looking back this project's development, I wish I had spent more time breaking down my code base into multiple components and organizing them thoughtfully. As the project is currently a single webpage with little-to-no need for component re-use, it may not have been strictly necessary. However I recognize that this is an important aspect of React development, and in my career it will often be standard practice. Additionally, it would have saved me time in the future when I add additional features to ths project.
<li>I wanted to present a large amount of data in a clear and visually appealing way, and with minimal scrolling required by the user. Early in development I set a goal of "no horizontal scrolling". This was relatively easy to achieve in desktop viewports, but required some creativity for mobile. I'm pleased to say that this goal was achieved in all devices with screen-width > 330px.</li>
<li>My design partner, Abigail, was fantastic to collaborate with, so I'm reluctant to put this in the "Challenges" section. This was my first time working with a UX/UI designer, and so I had to make sure I was communicating the goals and purpose of the project clearly. As she was new to F1, I spent time getting her up-to-speed with the sport, and shared some of my design inspiration from other projects and resources. I learned a lot about principles and best practices of UI design, and how to think from the user's perspective.</li>

# 💻 Technologies used
<li>React.js</li>
<li>JavaScript</li>
<li>Material UI</li>
<li>Figma</li>
<li>Anima</li>
<li>Google Fonts</li>
<li>ChatGPT</li>
<li>HTML/CSS</li>

<li>Notion (for design collaboration)</li>

# 🎯 Target Audience
<li>Sports betting is huge, and F1 has a rapidly growing profile. Place your bet with confidence.</li>
<li>F1, like any sport, has fantasy leagues and pools. Make informed predictions with ease.</li>
<li>Hardcore enthusiasts who just like to geek out about their passion.</li>
<li>New fans who watched <i>Drive to Survive</i> and want to know what's going on when they sit down to watch a race.</li>

# 🏆 Resources and Partners
The Ergast Developer API provides data for every driver, team, and race since 1950. This project would not have been possible without this excellent resource, and it offers me so many opportunites to expand this project in the future.<br/>
<br/>
Country Flags API was used for consistent formatting of the many flag images on this site.<br/>
<br/>
Design credit goes to Abigail Z, who I was fortunate enough to collaborate with during development of this project. She has elevated the style and user experience of The Final Lap to a level I never could have approached alone.<br/>
<br/>
I must also recognize my Get Coding coach, Hai Nghiem, who has been an excellent guide and source of encouragement to me as I learned my way around React.js. This project had its challenges, but Hai was a great support at every step of the journey.

# ❓ FAQs (Frequently Asked Questions)
<b>What criteria does this site use to rate each driver's race results?</b><br/><br/>
"Slightly above average" race results (light green) are greater than 1.5 finishing positions above the driver's season average.<br/>
"Above average" (medium green) race results are greater than 2.5 finishing positions above the driver's season average.<br/>
"Way above average" (dark green) race results are greater than 5 finishing positions above the driver's season average.<br/><br/>
The same criteria applies to results that are below average, except shades of red are used.<br/>
DNF (Did Not Finish) results do not affect the driver's averages (black squares)<br/><br/>

<b>Why are none of the race results for the current season colour-coded? All race finishes appear as "average", despite significant variation in race results.</b><br/><br/>
To ensure a sufficent sample size of race results, drivers must complete at least five race finishes in a season before the rating system is applied. Until this occurs, all race non-win race finishes for that driver are coded as "average" (white squares). I may revise the number of races for this sample size in the future. Let me know if you think it should be lower or higher!<br/><br/>

<b>What do the letters in the black squares indicate?</b><br/><br/>
DNF (Did Not Finish) results fall into three categories, based on the cause of the DNF.<br/>
<li>R - Retirement. This is typically due to mechanical failure or collision damage.</li>
<li>D - Disqualification. This is rare, but usually the result of a car that is found to be in violation of the technical regulations.</li>
<li>W - Withdrawal. Also very rare, this can happen if a car suffers a mechanical failure between qualifying and the race start, or if a driver gets injured after qualifying for the race.</li><br/><br/>

<b>Why "The Final Lap"?</b><br/><br/>
I made it up very early in development, before I wrote a line of code. I thought it sounded cool, but it was only supposed to be a working title until something better came along. Nothing ever did, but then I'm not the most imaginative person. When my design parter, Abigail, showed me the site logo she designed, the name was locked-in! 😅<br/>

# 🔮 Future Developments
This project in its current state satisifies my original MVP requirements (and a little extra). Here is what I may add in the future:
<li>Qualifying results in same categories mentioned above.</li>
<li>Results in rain-affected races. (Some drivers excel or struggle in the wet)</li>
<li>Weather predictor – widget that has up-to-date forecast for upcoming race weekend.</li>
<li>Team stats for in-season results</li>
<li>Results for fastest laps, fastest pitstops, practice sessions. Probabilities for safety cars, red flags at upcoming track.</li>
<br/>
I'm open to any ideas for new features and enhancements - please let me know if you have something in mind!


