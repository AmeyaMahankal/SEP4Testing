function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

it("capitalizes the first letter", () => {
    expect(capitalize("hello")).toBe("Hello")
})