import Section from '../../section';
import useWindowDimensions from '../hooks/windowDimensions';

function NightShift() {
    const window = useWindowDimensions();
    const body_height = window.height - 100 - 35;
    return (
        <div className=' bg-black text-center'>
            <p className='text-white text-section_title'>NightShift</p>
            <div className="row-span-1 bg-black  text-center gap-[2px] pb-4" style={{ overflowY: 'auto', height: body_height }}>
                <Section></Section>
            </div>
        </div>);
}
export default NightShift;