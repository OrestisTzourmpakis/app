export function dateConfiguration(dateString)
{
    if (dateString)
    {
        
        const splitArrayTemp = dateString.split("T");
        return splitArrayTemp[0];
    }
    else {
        return "";
    }
}