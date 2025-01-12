import { Button, Flex } from "@chakra-ui/react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

export const Auth = () => {
    return (
        <div className="sign-in-container">
            <SignedOut>
            <Flex gap={4}>
            <Button
            onClick={() => { }}
            variant="solid"
            colorScheme="teal"
            size="md"
          >
                <SignUpButton mode="modal" />
          </Button>
          <Button
            onClick={() => { }}
            variant="solid"
            colorScheme="teal"
            size="md"
          >
                <SignInButton mode="modal" />
          </Button>
            </Flex>
            </SignedOut>

            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}