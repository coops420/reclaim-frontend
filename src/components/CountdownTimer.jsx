import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";

const CountdownTimer = () => {
  const getNextMondayMidnight = () => {
    let now = new Date();
    let nextTarget = new Date(now);

    if (now.getDay() === 0) {
      nextTarget.setDate(now.getDate() + 1);
      nextTarget.setHours(0, 0, 0, 0);
    } else {
      let daysUntilMonday = (8 - now.getDay()) % 7;
      nextTarget.setDate(now.getDate() + daysUntilMonday);
      nextTarget.setHours(0, 0, 0, 0);
    }
    return nextTarget;
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = getNextMondayMidnight() - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-timer">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
      <div className="countdown-subtext">
        {/* Optional subtext can be added here */}
      </div>
    </div>
  );
};

export default CountdownTimer;
