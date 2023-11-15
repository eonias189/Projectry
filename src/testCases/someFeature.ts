export default function SomeFeature(...nums: number[]): number {
    return nums.reduce((sum: number, item: number): number => sum + item);
}
