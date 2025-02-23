import React, { useState, useEffect } from "react";
import "./CountdownTimer.css"; // ✅ Import Styles

const CountdownTimer = () => {
  const getNextMondayMidnight = () => {
    let now = new Date();
    let nextTarget = new Date(now);

    if (now.getDay() === 0) { // If today is Sunday
      nextTarget.setDate(now.getDate() + 1); // Set to Monday
      nextTarget.setHours(0, 0, 0, 0); // Midnight Monday
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
    <div className="countdown-box">
      <span className="countdown-time">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  );
};

export default CountdownTimer;
