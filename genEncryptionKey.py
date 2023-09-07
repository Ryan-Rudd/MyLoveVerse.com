import secrets

# Generate a 256-bit (32-byte) random key
secure_key = secrets.token_bytes(32)

# Convert the key to hexadecimal representation
hex_key = secure_key.hex()

print(hex_key)