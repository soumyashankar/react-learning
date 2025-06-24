export const extractCityName = (text) => {
    const regex = /in\s+([A-Za-z\s]+)/i;
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  };