import useWindowDimensions from '../hooks/windowDimensions';
import AddDepartment from './AddDepartment';
function Configuration() {
    const window = useWindowDimensions();
    const body_height = window.height - 100 - 35 - 100;
    return (
        <div className=' bg-black text-center'>
            <p className='text-white text-[50pt] h-[100px] '>Configuration</p>
            <div className="row-span-1 bg-black  text-left gap-[2px] pb-4 text-white" style={{ overflowY: 'auto', height: body_height }}>
                <AddDepartment></AddDepartment>
            </div>
        </div>);
}
export default Configuration;
