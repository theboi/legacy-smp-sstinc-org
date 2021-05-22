import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { User } from "../../model/user";

export default function UpdatePage(props: { user: User }) {
  function confirmDetails() {
    console.log(props.user);
  }
  // [1-4]0[1-8]
  return (
    <div>
      <h3>Update your account information</h3>
      <p>
        Welcome! In order to use SMP, we need to confirm some details about you.
      </p>
      <FormControl id="sstClass" isRequired>
        <FormLabel placeholder="101">SST Class (Format: #0#)</FormLabel>
        <Input
          placeholder="First name"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.keyCode === 13) confirmDetails();
          }}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={confirmDetails}>
        Confirm
      </Button>
    </div>
  );
}
