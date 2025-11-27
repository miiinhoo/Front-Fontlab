type Props = {
    font: any,
}

export default function FontCard({ font }:Props) {
  return (
    <div style={{ fontFamily: font.family }}>
      {font.family}
    </div>
  )
}
